import { FileText, PlusCircle, X } from "lucide-react";
import React from "react";
import { GroupInfoProps } from "./type";
import { useGroupInfo } from "./hook";
import styles from "./styles.module.scss";

const GroupInfo: React.FC<GroupInfoProps> = ({ onClose, informationGroup }) => {
  const {
    listMembers,
    removeMember,
    searchTerm,
    handleSearch,
    searchResults,
    addMember,
    handleDeleteGroup,
  } = useGroupInfo(informationGroup, onClose);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{informationGroup.name}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
              Members ({listMembers?.length})
            </h4>
            <ul className={styles.membersList}>
              {listMembers?.map((member, index) => (
                <li key={index} className={styles.memberItem}>
                  <div className={styles.memberInfo}>
                    <img
                      className={styles.avatar}
                      src={member.avatar}
                      alt={member.username}
                    />
                    <span className={styles.memberName}>
                      {member.username}
                    </span>
                  </div>
                  <X
                    size={15}
                    className={styles.memberAction}
                    onClick={() => removeMember(member.id)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Search Members</h4>
            <input
              type="text"
              placeholder="Search users..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <ul className={styles.searchResultsList}>
              {searchResults?.map((user) => (
                <li
                  key={user.id}
                  className={styles.searchItem}
                  onClick={() => addMember(user)}
                >
                  <div className={styles.memberInfo}>
                    <img
                      className={styles.avatar}
                      src={user.avatar}
                      alt={user.username}
                    />
                    <span className={styles.memberName}>
                      {user.username}
                    </span>
                  </div>
                  <PlusCircle />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Shared Files</h4>
            <ul className={styles.filesList}>
              {["Project_Plan.pdf", "Design_Mockups.zip"].map((file, index) => (
                <li key={index} className={styles.fileItem}>
                  <FileText className={styles.fileIcon} />
                  <span className={styles.fileName}>{file}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.section}>
            <button
              onClick={handleDeleteGroup}
              className={styles.deleteButton}
            >
              Delete Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { GroupInfo };
