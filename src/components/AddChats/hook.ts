import { useState } from "react";
import { THookAddChats, TUserSearch } from "./type";
import {
  createGroupApi,
  getSearchUser,
} from "../../services/api-service/api-service";

export const useAddChats = (onClose): THookAddChats => {
  const [groupName, setGroupName] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [selectedMembers, setSelectedMembers] = useState<TUserSearch[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TUserSearch[]>([]);

  /**
   * handle Search
   * @param term: string 
   */
  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.length > 0) {
      try {
        const response = await getSearchUser({
          key: searchTerm,
        });
        setSearchResults(response);
      } catch (error) {
        console.error("Error searching users:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  /**
   * handle add Member
   * @param member: TUserSearch 
   */
  const addMember = (member: TUserSearch) => {
    if (!selectedMembers.find((m) => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  /**
   * handle remove Member
   * @param id: number 
   */
  const removeMember = (id: number) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== id));
  };

  const createGroup = async () => {
    if (!groupName.trim()) {
      alert("Please enter a group name.");
      return;
    }

    const groupData = {
      name: groupName,
      type: isPrivate ? "private" : "public",
      members: selectedMembers.map((member) => member.id),
    };

    try {
      const response = await createGroupApi(groupData);
      alert("Group created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };
  return {
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
  };
};
