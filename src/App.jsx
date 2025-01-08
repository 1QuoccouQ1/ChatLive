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
  const [showAddChats, setShowAddChats] = useState(false);
  const [informationGroup, setInformationGroup] = useState("");

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
