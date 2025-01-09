import React from "react";
import { Smile, Paperclip, Send, MoreVertical } from "lucide-react";
import { ChatAreaProps } from "./type";
import { TDataSideBar } from "../Sidebar/type";
import { useChatArea } from "./hook";
import styles from './styles.module.scss';

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
    selectedFiles,
    handleRemoveFile,
    handleSendMessageWithFile,
    setIsEmojiPickerVisible,
    handleFileChange,
    isEmojiPickerVisible,
  } = useChatArea(activeChat, typeChat, setInformationGroup);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <img
            className={styles.avatar}
            src={information.avatar}
            alt={typeChat === "group" ? "Group Chat" : "User Chat"}
          />
          <div className={styles.headerText}>
            <h2 className={styles.username}>
              {information.username ? information.username : information.name}
            </h2>
            <p className={styles.subtext}>
              {typeChat === "group"
                ? `${information.members?.length} members`
                : "Online"}
            </p>
          </div>
        </div>
        {typeChat === "group" && (
          <button onClick={toggleGroupInfo} className={styles.button}>
            <MoreVertical />
          </button>
        )}
      </div>

      <div className={styles.chatArea}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
          </div>
        ) : error ? (
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>{error}</p>
          </div>
        ) : (
          <div className={styles.messageList}>
            {messages.map((msg: TDataSideBar, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  msg.sender_id ===
                  JSON.parse(localStorage.getItem("user") as string).id
                    ? styles.messageReverse
                    : ""
                }`}
              >
                <img className={styles.messageAvatar} src={msg.avatar} />
                <div
                  className={`${styles.messageBubble} ${
                    msg.sender === "You"
                      ? styles.messageBubbleOutgoing
                      : styles.messageBubbleIncoming
                  }`}
                >
                  {typeChat === "group" && (
                    <p className={styles.messageSender}>
                      {msg.sender_username}
                    </p>
                  )}
                  <p className={styles.messageText}>{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {selectedFiles.length > 0 && (
        <div className={styles.fileContainer}>
          <ul className={styles.fileList}>
            {selectedFiles.map((file, index) => (
              <li key={index} className={styles.fileItem}>
                <span>{file.name}</span>
                <button
                  className={styles.fileRemoveButton}
                  onClick={() => handleRemoveFile(file)}
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSendMessageWithFile} className={styles.form}>
        <div className={styles.formGroup}>
          <button
            type="button"
            className={styles.formButton}
            onClick={() => setIsEmojiPickerVisible(!isEmojiPickerVisible)}
          >
            <Smile />
          </button>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className={styles.formButton}>
            <Paperclip />
          </label>
          <input
            type="text"
            placeholder="Type a message..."
            className={styles.formInput}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className={styles.formSubmit}>
            <Send />
          </button>
        </div>
      </form>
    </div>
  );
};

export { ChatArea };
