import { useState, useEffect, useRef } from "react";
import { Smile, Paperclip, Send, MoreVertical } from "lucide-react";
import React from "react";
import { ChatAreaProps, Message } from "./type";
import pusherService from "../../services/pusher-service/pusher";
import {
  getMessagesGroup,
  getMessagesUser,
  sendMessagesGroup,
  sendMessagesUser,
} from "../../services/api-service/api-service";
import { TDataSideBar } from "../Sidebar/type";

const ChatArea: React.FC<ChatAreaProps> = ({
  activeChat,
  typeChat,
  toggleGroupInfo,
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [information, setInformation] = useState<TDataSideBar>(Object);

  useEffect(() => {
    fetchMessages();
  }, [activeChat, typeChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    setIsLoading(true);
    setError(null);
    if (typeChat == "group") {
      try {
        const response = await getMessagesGroup(activeChat);
        setInformation(response.information);
        setMessages(response.messages);
      } catch (err) {
        setError("Failed to load messages. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    } else if (typeChat == "user") {
      try {
        const response = await getMessagesUser(activeChat);
        setInformation(response.information);
        setMessages(response.messages);
      } catch (err) {
        setError("Failed to load messages. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      if (typeChat == "group") {
        try {
          const value = {
            content: message,
          };
          const response = await sendMessagesGroup(activeChat, value);
          setMessages((prevMessages) => [...prevMessages, response.message]);
          setMessage("");
        } catch (err) {
          setError("Failed to load messages. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      } else if (typeChat == "user") {
        try {
          const value = {
            receiver_id: activeChat,
            content: message,
          };
          const response = await sendMessagesUser(value);
          setMessages((prevMessages) => [...prevMessages, response.message]);
          setMessage("");
        } catch (err) {
          setError("Failed to load messages. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    // pusherService.initPusher("c47e12db7c7164bcc7db", "ap1");

    // pusherService.subscribeToChannel("my-channel", "my-event", (data) => {
    //   alert(JSON.stringify(data));
    // });

    // return () => {
    //   pusherService.unsubscribeChannel();
    // };
    pusherService.initPusher("c47e12db7c7164bcc7db", "ap1");

    const channelName =
    typeChat === 'group' ? `group-${activeChat}` : `user-${activeChat}`;
  
    pusherService.subscribeToChannel(channelName, 'my-event', (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        ...data
      ]);
    }); 

    return () => {
      pusherService.unsubscribeChannel();
    };
  }, [activeChat , typeChat]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={
              typeChat === "group"
                ? "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
                : "https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010_960_720.jpg"
            }
            alt={typeChat === "group" ? "Group Chat" : "John Doe"}
          />
          <div className="ml-3">
            <h2 className="text-lg font-semibold text-gray-800">
              {information.username ? information.username : information.name}
            </h2>
            <p className="text-sm text-gray-600">
              {typeChat === "group" ? "4 members" : "Online"}
            </p>
          </div>
        </div>
        {typeChat === "group" && (
          <button
            onClick={toggleGroupInfo}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            aria-label="Toggle group info"
          >
            <MoreVertical className="w-6 h-6 text-gray-600" />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "You" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-lg ${
                    msg.sender === "You"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <p className="font-semibold mb-1">{msg.sender}</p>
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <form
        onSubmit={handleSendMessage}
        className="p-4 bg-white border-t border-gray-200"
      >
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label="Insert emoji"
          >
            <Smile className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label="Attach file"
          >
            <Paperclip className="w-6 h-6" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
            aria-label="Send message"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export { ChatArea };
