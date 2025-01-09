import React, { useState } from "react";
import { Smile, Paperclip, Send, MoreVertical } from "lucide-react";
import { ChatAreaProps } from "./type";
import { TDataSideBar } from "../Sidebar/type";
import { useChatArea } from "./hook";

const ChatArea: React.FC<ChatAreaProps> = ({
  activeChat,
  typeChat,
  toggleGroupInfo,
  setInformationGroup,
}) => {
  const {
    information,
    isLoading,
    error,
    messages,
    messagesEndRef,
    handleSendMessage,
    message,
    setMessage,
  } = useChatArea(activeChat, typeChat, setInformationGroup);

  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);  // Sử dụng mảng để lưu nhiều file

  const handleEmojiSelect = (emoji) => {
    setMessage(prevMessage => prevMessage + emoji.native); // Thêm emoji vào message
    setIsEmojiPickerVisible(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(files)]); // Thêm các file mới vào danh sách
    }
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setSelectedFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove)); // Xóa file khỏi danh sách
  };

  const handleSendMessageWithFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length > 0) {
      // Gửi file lên server hoặc xử lý gửi file với tin nhắn
      console.log(selectedFiles);
      setSelectedFiles([]); // Reset danh sách file sau khi gửi
    }
    handleSendMessage(e); // Gửi tin nhắn văn bản
  };

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
              {typeChat === "group" ? `${information.members?.length} members` : "Online"}
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
            {messages &&
              messages.map((msg: TDataSideBar, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    msg.sender_id ===
                    JSON.parse(localStorage.getItem("user") as string).id
                      ? "justify-start flex-row-reverse"
                      : "justify-start"
                  }`}
                >
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010_960_720.jpg"
                  />
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4 h-[48px] flex flex-col justify-center rounded-lg mx-2 ${
                      msg.sender === "You"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    {typeChat == "group" && (
                      <p className="font-semibold mb-1 text-base">
                        {msg.sender_username}
                      </p>
                    )}
                    <p className="text-sm break-words">{msg.content}</p>
                  </div>
                </div>
              ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Hiển thị các file đã chọn ở trên đầu */}
      {selectedFiles.length > 0 && (
        <div className="p-4 bg-gray-200 border-t border-gray-300">
          <h4 className="font-semibold text-gray-800">Selected Files:</h4>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index} className="text-gray-600 flex justify-between items-center">
                <span>{file.name}</span>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 ml-2"
                  onClick={() => handleRemoveFile(file)}  // Xóa file khi nhấn vào nút
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form
        onSubmit={handleSendMessageWithFile}
        className="p-4 bg-white border-t border-gray-200"
      >
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            onClick={() => setIsEmojiPickerVisible(!isEmojiPickerVisible)}
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

          {/* Cho phép chọn nhiều file */}
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Paperclip className="w-6 h-6" />
          </label>

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
