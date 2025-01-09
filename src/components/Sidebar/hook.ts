import { useEffect, useRef, useState } from "react";
import {
  checkUpdateMessages,
  getSearch,
} from "../../services/api-service/api-service";
import { TDataSideBar, THookSideBar } from "./type";
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
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLUListElement>(null);

  /**
   * Handle Search Change
   * @param e: React.ChangeEvent<HTMLInputElement>
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  /**
   * Handle Search Focus
   */
  const handleSearchFocus = () => {
    if (searchQuery && listSearchs.length > 0) {
      setShowSearchResults(true);
    }
  };

  /**
   * Handle fetch Search API
   */
  const fetchSearch = async () => {
    if (searchQuery !== "") {
      const value = {
        key: searchQuery,
      };
      try {
        const response = await getSearch(value);
        if (response?.status == 200) {
          setListSearchs(response.data);
        }
      } catch (err) {}
    }
  };

  /**
   * Handle Check Update Messages
   */
  const handleCheckUpdateMessages = async () => {
    try {
      const response = await checkUpdateMessages({
        data: value,
      });
      if (response?.status == 200) {
        setListChats(response.data);
        localStorage.setItem("HistoryChats", JSON.stringify(response.data));
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
      setListChats(newValue);
      localStorage.setItem("HistoryChats", JSON.stringify(newValue));
    } else {
      localStorage.setItem("HistoryChats", JSON.stringify([item]));
    }
  };

  useEffect(() => {
    fetchSearch();
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    pusherService.initPusher("c47e12db7c7164bcc7db", "ap1");

    pusherService.subscribeToChannel("public-chat", "my-event", (data) => {
      handleCheckUpdateMessages();
    });

    return () => {
      pusherService.unsubscribeChannel("public-chat");
    };
  },[]);

  return {
    listChats,
    setSearchQuery,
    searchQuery,
    listSearchs,
    handleSelectedChat,
    currentIndex,
    setCurrentIndex,
    searchInputRef,
    handleSearchChange,
    handleSearchFocus,
    showSearchResults,
    searchResultsRef,
    setShowSearchResults,
  };
};
