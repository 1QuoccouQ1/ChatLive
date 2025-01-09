"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { GroupInfo } from "./components/GroupInfo";
import { ChatArea } from "./components/ChatArea";
import { AddChats } from "./components/AddChats/AddChats";

export default function MessagingApp() {
  const historyChats = JSON.parse(localStorage.getItem("HistoryChats"));
  const [activeChat, setActiveChat] = useState(() => {
    const value = localStorage.getItem("activeChat");
    return value ? value : historyChats[0].id;
  });
  const [typeChat, setTypeChat] = useState(() => {
    const value = localStorage.getItem("typeChat");
    return value ? value : historyChats[0].type;
  });
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [showAddChats, setShowAddChats] = useState(false);
  const [informationGroup, setInformationGroup] = useState("");

  useEffect(() => {
    localStorage.setItem("activeChat", activeChat);
    localStorage.setItem("typeChat", typeChat);
  }, [activeChat, typeChat]);

  const toggleGroupInfo = () => {
    setShowGroupInfo(!showGroupInfo);
  };
  const toggleAddChats = () => {
    setShowAddChats(!showGroupInfo);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        setTypeChat={setTypeChat}
        toggleAddChats={toggleAddChats}
      />
      <div className="flex-1">
        <ChatArea
          activeChat={activeChat}
          typeChat={typeChat}
          toggleGroupInfo={toggleGroupInfo}
          setInformationGroup={setInformationGroup}
        />
      </div>
      {showGroupInfo && (
        <GroupInfo
          onClose={() => setShowGroupInfo(false)}
          informationGroup={informationGroup}
        />
      )}
      {showAddChats && <AddChats onClose={() => setShowAddChats(false)} />}
    </div>
  );
}
