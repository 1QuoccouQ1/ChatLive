import { X } from "lucide-react";
import React from "react";
import { AddChatsProps } from "./type";
import { useAddChats } from "./hook";
import styles from "./styles.module.scss";

const AddChats: React.FC<AddChatsProps> = ({ onClose }) => {
  const {
    groupName,
    setGroupName,
    isPrivate,
    setIsPrivate,
    searchTerm,
    handleSearch,
    searchResults,
    addMember,
    selectedMembers,
    removeMember,
    createGroup,
  } = useAddChats(onClose);

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add Groups</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.inputGroup}>
            <h3 className={styles.inputLabel}>Groups name</h3>
            <input
              type="text"
              placeholder="Enter Groups name ..."
              className={styles.input}
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className={styles.switchContainer}>
            <div>
              <p className={styles.switchLabel}>Private</p>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                className={styles.switchInput}
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
              <div className={`${styles.switchTrack} ${isPrivate ? "checked" : ""}`}>
                <div className={`${styles.switchThumb} ${isPrivate ? "checked" : ""}`} />
              </div>
            </label>
          </div>

          <div className={styles.searchContainer}>
            <h4 className={styles.inputLabel}>Search Members</h4>
            <input
              type="text"
              placeholder="Search users..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <ul className={styles.searchList}>
              {searchResults.map((user) => (
                <li
                  key={user.id}
                  className={styles.searchItem}
                  onClick={() => addMember(user)}
                >
                  <img
                    className={styles.searchAvatar}
                    src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010_960_720.jpg"
                    alt={user.username}
                  />
                  <span className={styles.searchName}>{user.username}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.selectedContainer}>
            <h4 className={styles.inputLabel}>
              Selected Members ({selectedMembers.length})
            </h4>
            <ul className={styles.selectedList}>
              {selectedMembers.map((member) => (
                <li key={member.id} className={styles.selectedItem}>
                  <img
                    className={styles.selectedAvatar}
                    src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010_960_720.jpg"
                    alt={member.username}
                  />
                  <span className={styles.selectedName}>{member.username}</span>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeMember(member.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center">
            <p className={styles.createButton} onClick={createGroup}>
              Create Group
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddChats };
