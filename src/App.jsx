"use client";

import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { GroupInfo } from "./components/GroupInfo";
import { ChatArea } from "./components/ChatArea";
import { AddChats } from "./components/AddChats/AddChats";

export default function MessagingApp() {
  const [activeChat, setActiveChat] = useState(1);
  const [typeChat, setTypeChat] = useState("group");
  const [showGroupInfo, setShowGroupInfo] = useState(false);

  const toggleGroupInfo = () => {
    setShowGroupInfo(!showGroupInfo);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeChat={activeChat} setActiveChat={setActiveChat} setTypeChat={setTypeChat} />
      <div className="flex-1">
        <ChatArea activeChat={activeChat} typeChat={typeChat} toggleGroupInfo={toggleGroupInfo} />
      </div>
      {showGroupInfo && <GroupInfo onClose={() => setShowGroupInfo(false)} />}
    </div>
  );
}
