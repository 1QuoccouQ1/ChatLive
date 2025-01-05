'use client'

import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import GroupInfo from './components/GroupInfo'

export default function MessagingApp() {
  const [activeChat, setActiveChat] = useState('group')
  const [showGroupInfo, setShowGroupInfo] = useState(false)

  const toggleGroupInfo = () => {
    setShowGroupInfo(!showGroupInfo)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeChat={activeChat} setActiveChat={setActiveChat} />
      <div className="flex-1">
        <ChatArea 
          activeChat={activeChat} 
          toggleGroupInfo={toggleGroupInfo}
        />
      </div>
      {showGroupInfo && <GroupInfo onClose={() => setShowGroupInfo(false)} />}
    </div>
  )
}

