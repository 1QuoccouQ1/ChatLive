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

export const useChatArea = (
  activeChat,
  typeChat,
  setInformationGroup
): THookChatArea => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [information, setInformation] = useState<TDataSideBar>(Object);
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  /**
   * Handle Emoji Select
   * @param emoji
   */
  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.native);
    setIsEmojiPickerVisible(false);
  };

  /**
   * Handle File Change
   * @param e: React.ChangeEvent<HTMLInputElement>
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }
  };

  /**
   * Handle Remove File
   * @param fileToRemove: File
   */
  const handleRemoveFile = (fileToRemove: File) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove)
    );
  };

  /**
   * Handle Send Message With File
   * @param e: React.FormEvent
   */
  const handleSendMessageWithFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length > 0) {
      console.log(selectedFiles);
      setSelectedFiles([]);
    }
    handleSendMessage(e);
  };

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
        if (response?.status == 200) {
          setInformation(response.data.information);
          setInformationGroup(response.data.information);
          setMessages(response.data.messages);
        }
      } catch (err) {
        setError("Failed to load messages. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    } else if (typeChat == "user") {
      try {
        const response = await getMessagesUser(activeChat);
        if (response?.status == 200) {
          setInformation(response.data.information);
          setMessages(response.data.messages);
        }
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
          if (response?.status == 200) {
            setMessage("");
          } else setError("Failed to send messages. Please try again later.");
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
          setMessages((prevMessages) => [
            ...prevMessages,
            response?.data.message,
          ]);
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
        pusherService.unsubscribeChannel(channelName);
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
        pusherService.unsubscribeChannel(channelName);
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
    selectedFiles,
    handleRemoveFile,
    handleSendMessageWithFile,
    setIsEmojiPickerVisible,
    handleFileChange,
    isEmojiPickerVisible,
  };
};
