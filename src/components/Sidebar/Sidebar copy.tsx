import { MessageCirclePlus, Search } from "lucide-react";
import React from "react";
import { SidebarProps } from "./type";
import { useSidebar } from "./hook";
import styles from './Sidebar.module.scss';

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
    searchInputRef,
    handleSearchChange,
    handleSearchFocus,
    showSearchResults,
    searchResultsRef,
    setShowSearchResults,
  } = useSidebar();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarSearch}>
        <div className={styles.searchInputWrapper}>
          <span className={styles.searchIcon}>
            <Search className="w-5 h-5 text-gray-400" />
          </span>
          <input
            ref={searchInputRef}
            type="search"
            className={styles.searchInput}
            placeholder="Search chats"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
          />
          {showSearchResults && searchQuery && listSearchs.length > 0 && (
            <ul ref={searchResultsRef} className={styles.searchResults}>
              {listSearchs.map((searchItem, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    handleSelectedChat(searchItem);
                    setActiveChat(searchItem.id);
                    setTypeChat(searchItem.name ? "group" : "user");
                    setSearchQuery("");
                    setShowSearchResults(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      className={styles.chatAvatar}
                      src={searchItem.avatar}
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
      <div className={styles.chatList}>
        <h2 className={styles.chatsTitle}>Chats</h2>
        <ul>
          {listChats.map((chat, index) => (
            <li key={index}>
              <div
                className={`${styles.chatItem} ${currentIndex === index ? styles.selectedChatItem : 'hover:bg-gray-200'}`}
                onClick={() => {
                  setCurrentIndex(index);
                  handleSelectedChat(chat);
                  setActiveChat(chat.id);
                  setTypeChat(chat.name ? "group" : "user");
                }}
              >
                <img
                  className={styles.chatAvatar}
                  src={chat.avatar}
                  alt={chat.username}
                />
                <div className={styles.chatDetails}>
                  <div className={styles.chatHeader}>
                    <h3 className={styles.chatName}>
                      {chat.username || chat.name}
                    </h3>
                    <p className={styles.chatTime}>5 minutes</p>
                  </div>
                  <p className={styles.chatMessage}>
                    {chat.latest_message}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Sidebar };
