import { useEffect, useState } from "react";
import { getSearch } from "../../services/api-service/api-service";
import { TDataSideBar, THookSideBar } from "./type";

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

  const filteredChats =
    listChats.length > 0
      ? listChats.filter(
          (chat) =>
            chat.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  useEffect(() => {
    fetchSearch();
  }, [searchQuery]);

  return {
    filteredChats,
    setSearchQuery,
    searchQuery,
    listSearchs,
    handleSelectedChat,
    currentIndex,
    setCurrentIndex,
  };
};
