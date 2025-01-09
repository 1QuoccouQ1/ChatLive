import { MessageCirclePlus, Search } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { SidebarProps } from "./type";
import { useSidebar } from "./hook";

const Sidebar: React.FC<SidebarProps> = ({
  activeChat,
  setActiveChat,
  setTypeChat,
  toggleAddChats,
}) => {
  const {
    listChats,
    setSearchQuery,
    searchQuery,
    listSearchs,
    handleSelectedChat,
    currentIndex,
    setCurrentIndex,
  } = useSidebar();

  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLUListElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleSearchFocus = () => {
    if (searchQuery && listSearchs.length > 0) {
      setShowSearchResults(true); 
    }
  };

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

  return (
    <>
      <div className="max-w-[350px] min-w-[300px] h-screen bg-gray-100 border-r border-gray-200">
        <div className="p-4 flex items-center gap-4 relative">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="w-5 h-5 text-gray-400" />
            </span>
            <input
              ref={searchInputRef}
              type="search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search chats"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus} 
            />
            {showSearchResults && searchQuery && listSearchs.length > 0 && (
              <ul
                ref={searchResultsRef}
                className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-md w-full max-h-60 overflow-y-auto"
              >
                {listSearchs.map((searchItem, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      handleSelectedChat(searchItem);
                      setActiveChat(searchItem.id);
                      if (searchItem.name) {
                        setTypeChat("group");
                      } else setTypeChat("user");
                      setSearchQuery(""); 
                      setShowSearchResults(false); 
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        className="w-8 h-8 rounded-full object-cover"
                        src="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
                        alt={searchItem.username || searchItem.name}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {searchItem.username || searchItem.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {searchItem.latest_message || "No messages yet"}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <MessageCirclePlus
            className="cursor-pointer"
            onClick={toggleAddChats}
          />
        </div>
        <div className="overflow-y-auto h-[calc(100vh-5rem)]">
          <h2 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Chats
          </h2>
          <ul>
            {listChats.map((chat, index) => (
              <li key={index}>
                <button
                  className={`w-full flex items-center outline-0 px-4 py-3 text-left transition duration-150 ease-in-out ${
                    currentIndex === index
                      ? "bg-blue-100"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => {
                    setCurrentIndex(index);
                    handleSelectedChat(chat);
                    setActiveChat(chat.id);
                    if (chat.name) {
                      setTypeChat("group");
                    } else setTypeChat("user");
                  }}
                >
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
                    alt={chat.username}
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-bottom justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        {chat.username || chat.name}
                      </h3>
                      <p className="text-xs text-gray-500">5 minutes</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 truncate">
                      {chat.latest_message}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export { Sidebar };
