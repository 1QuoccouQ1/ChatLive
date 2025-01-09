import { useState } from "react";
import { THookGroupInfo } from "./type";
import {
  addMemberToGroup,
  delGroup,
  delMemberToGroup,
  getSearchUser,
} from "../../services/api-service/api-service";
import { TUserSearch } from "../AddChats/type";

export const useGroupInfo = (informationGroup, onClose): THookGroupInfo => {
  const [listMembers, setListMembers] = useState<TUserSearch[]>(
    informationGroup.members as []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TUserSearch[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<TUserSearch[]>([]);

  /**
   * handle Search
   * @param term: string
   */
  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (searchTerm !== "") {
      try {
        const response = await getSearchUser({
          group: informationGroup.id,
          key: searchTerm,
        });
        if (response?.status == 200) setSearchResults(response?.data);
      } catch (error) {}
    } else {
      setSearchResults([]);
    }
  };

  /**
   * handle add Member
   * @param member: TUserSearch
   */
  const addMember = async (member: TUserSearch) => {
    if (!selectedMembers.find((m) => m.id === member.id)) {
      try {
        const response = await addMemberToGroup(informationGroup.id, {
          user_id: member.id,
        });
        if (response?.status == 200) {
          setSelectedMembers([...selectedMembers, member]);
          setListMembers((prevList) => [...(prevList || []), member]);
        }
      } catch (error) {
        console.error("Error searching users:", error);
      }
    }
  };

  /**
   * handle remove Member
   * @param id: number
   */
  const removeMember = async (id: number) => {
    try {
      const response = await delMemberToGroup(informationGroup.id, id);
      if (response?.status == 200) {
        setSelectedMembers(selectedMembers.filter((m) => m.id !== id));
        setListMembers(listMembers.filter((m) => m.id !== id));
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  /**
   * handle Delete Group
   */
  const handleDeleteGroup = async () => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa nhóm này không?"
    );
    if (isConfirmed) {
      try {
        const response = await delGroup(informationGroup.id);
        if (response?.status == 200) {
          alert(response.data.message);
        }
        onClose();
      } catch (error) {
        alert("Error deleting group.");
      }
    }
  };
  return {
    listMembers,
    removeMember,
    searchTerm,
    handleSearch,
    searchResults,
    addMember,
    handleDeleteGroup,
  };
};
