import { useEffect, useRef, useState } from "react";
import { Message, THookChatArea } from "./type";
import { TDataSideBar } from "../Sidebar/type";
import {
  getMessagesGroup,
  getMessagesUser,
  sendMessagesGroup,
  sendMessagesUser,
} from "../../services/api-service/api-service";
import pusherService from "../../services/pusher-service/pusher";

export const useChatArea = (activeChat, typeChat ,setInformationGroup): THookChatArea => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [information, setInformation] = useState<TDataSideBar>(Object);

  /**
   * Handle scroll To Bottom
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Handle fetch Messages
   */
  const fetchMessages = async () => {
    setIsLoading(true);
    setError(null);
    if (typeChat == "group") {
      try {
        const response = await getMessagesGroup(activeChat);
        setInformation(response.information);
        setInformationGroup(response.information);
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

  /**
   * Handle Send Message
   * @param e :React.FormEvent
   */
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      if (typeChat == "group") {
        try {
          const value = {
            content: message,
          };
          const response = await sendMessagesGroup(activeChat, value);
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
    pusherService.initPusher("c47e12db7c7164bcc7db", "ap1");

    if (typeChat === "group") {
      const channelName = `group-${activeChat}`;
      pusherService.subscribeToChannel(channelName, "my-event", (data) => {
        setMessages((prevMessages) => {
          if (Array.isArray(prevMessages)) {
            return [...prevMessages, data];
          }
          return [data];
        });
      });

      return () => {
        pusherService.unsubscribeChannel();
      };
    } else {
      const channelName = `user-${
        JSON.parse(localStorage.getItem("user") as string).id
      }`;
      pusherService.subscribeToChannel(channelName, "my-event", (data) => {
        if (data.sender_id === activeChat) {
          setMessages((prevMessages) => {
            if (Array.isArray(prevMessages)) {
              return [...prevMessages, data];
            }
            return [data];
          });
        }
      });

      return () => {
        pusherService.unsubscribeChannel();
      };
    }
  }, [activeChat, typeChat]);

  useEffect(() => {
    fetchMessages();
  }, [activeChat, typeChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return {
    information,
    isLoading,
    error,
    messages,
    messagesEndRef,
    handleSendMessage,
    message,
    setMessage,
  };
};
