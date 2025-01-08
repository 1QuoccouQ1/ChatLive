import React, { SetStateAction } from "react";
import { TDataSideBar } from "../Sidebar/type";

type Message = {
  id: number;
  sender: string;
  content: string;
};

type ChatAreaProps = {
  activeChat: number;
  typeChat: string;
  toggleGroupInfo: () => void;
  setInformationGroup: React.Dispatch<React.SetStateAction<object>>;
};
type THookChatArea = {
  information: TDataSideBar;
  isLoading: boolean;
  error: string | null;
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  handleSendMessage: (e: React.FormEvent) => void;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

export { Message, ChatAreaProps, THookChatArea };
