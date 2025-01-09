import { useEffect, useState } from "react";
import { getSearch } from "../../services/api-service/api-service";
import { TDataSideBar, THookSideBar } from "./type";
import Pusher from "pusher-js";
import pusherService from "../../services/pusher-service/pusher";

export const useSidebar = (): THookSideBar => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [listChats, setListChats] = useState<TDataSideBar[]>(() => {
    const value = JSON.parse(localStorage.getItem("HistoryChats") as string);
    return value ? value : [];
  });
  const [listSearchs, setListSearchs] = useState<TDataSideBar[]>([]);
  const value = JSON.parse(localStorage.getItem("HistoryChats") as string);

  /**
   * Handle fetch Search API
   */
  const fetchSearch = async () => {
    const value = {
      key: searchQuery,
    };
    try {
      const response = await getSearch(value);
      if (response) {
        setListSearchs(response);
      }
    } catch (err) {}
  };

  /**
   * Handle Selected Chat
   * @param item: TDataSideBar
   */
  const handleSelectedChat = (item: TDataSideBar) => {
    if (value) {
      const found = value.some((element) =>
        item.name
          ? element.name === item.name
          : element.username === item.username
      );
      if (found) return;
      const newValue = [...value, item];
      localStorage.setItem("HistoryChats", JSON.stringify(newValue));
    } else {
      localStorage.setItem("HistoryChats", JSON.stringify([item]));
    }
  };

  // const filteredChats =
  //   listChats.length > 0
  //     ? listChats.filter(
  //         (chat) =>
  //           chat.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //           chat.name?.toLowerCase().includes(searchQuery.toLowerCase())
  //       )
  //     : [];

  useEffect(() => {
    fetchSearch();
  }, [searchQuery]);

  useEffect(() => {
    pusherService.initPusher("c47e12db7c7164bcc7db", "ap1");

    pusherService.subscribeToChannel("public-chat", "my-event", (data) => {
      setListChats((prevChats) => {
        const existingChatIndex = prevChats.findIndex(
          (chat) =>
            (chat.username === data.sender_username || chat.name === data.group_name)
        );

        if (existingChatIndex !== -1) {
          const updatedChats = [...prevChats];
          updatedChats[existingChatIndex].latest_message = data.message;
          return updatedChats;
        }

        const newChat = {
          id: data.sender_id || data.group_id,
          username: data.sender_username || data.group_name,
          latest_message: data.message,
        };
        const updatedChats = [newChat, ...prevChats];

        localStorage.setItem("HistoryChats", JSON.stringify(updatedChats));
        return updatedChats;
      });
    });

    return () => {
      pusherService.unsubscribeChannel();
    };
  }, [searchQuery]);
  
  return {
    listChats,
    setSearchQuery,
    searchQuery,
    listSearchs,
    handleSelectedChat,
    currentIndex,
    setCurrentIndex,
  };
};
