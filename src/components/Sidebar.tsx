import { useState } from 'react'
import { Search } from 'lucide-react'

interface SidebarProps {
  activeChat: string
  setActiveChat: (chat: string) => void
}

export default function Sidebar({ activeChat, setActiveChat }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const chats = [
    { id: 'group', name: 'Project Team', lastMessage: 'John: Great progress everyone!', time: '5 minutes', avatar: 'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png' },
    { id: 'john', name: 'John Doe', lastMessage: 'Hey! How are you?', time: '25 minutes', avatar: 'https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010_960_720.jpg' },
    { id: 'sarah', name: 'Sarah Smith', lastMessage: 'Can you review the latest designs?', time: '1 hour', avatar: 'https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383_960_720.jpg' },
    { id: 'mike', name: 'Mike Johnson', lastMessage: 'Meeting at 3 PM, don\'t forget!', time: '2 hours', avatar: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg' },
  ]

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full h-screen bg-gray-100 border-r border-gray-200">
      <div className="p-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-5 h-5 text-gray-400" />
          </span>
          <input 
            type="search" 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Search chats" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-5rem)]">
        <h2 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Chats</h2>
        <ul>
          {filteredChats.map((chat) => (
            <li key={chat.id}>
              <button
                className={`w-full flex items-center px-4 py-3 text-left transition duration-150 ease-in-out ${
                  activeChat === chat.id ? 'bg-blue-100' : 'hover:bg-gray-200'
                }`}
                onClick={() => setActiveChat(chat.id)}
              >
                <img className="w-12 h-12 rounded-full object-cover" src={chat.avatar} alt={chat.name} />
                <div className="ml-4 flex-1">
                  <div className="flex items-bottom justify-between">
                    <h3 className="text-sm font-medium text-gray-900">{chat.name}</h3>
                    <p className="text-xs text-gray-500">{chat.time}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

