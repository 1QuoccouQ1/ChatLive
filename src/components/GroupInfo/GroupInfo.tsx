import { FileText, PlusCircle, PlusCircleIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { GroupInfoProps } from "./type";
import {
  addMemberToGroup,
  delMemberToGroup,
  getSearchUser,
} from "../../services/api-service/api-service";
import { TUserSearch } from "../AddChats/type";

const GroupInfo: React.FC<GroupInfoProps> = ({ onClose, informationGroup }) => {
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
    if (term.length > 0) {
      try {
        const response = await getSearchUser({
          key: searchTerm,
        });
        setSearchResults(response);
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
        setSelectedMembers([...selectedMembers, member]);
        setListMembers((prevList) => [...(prevList || []), member]);
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
      if (response) {
        setSelectedMembers(selectedMembers.filter((m) => m.id !== id));
        setListMembers(listMembers.filter((m) => m.id !== id));
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {informationGroup.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 max-h-[80vh] overflow-y-auto">
          <div className="mb-6">
            <h4 className="text-md font-semibold mb-3 text-gray-700">
              Members ({listMembers && listMembers.length})
            </h4>
            <ul className="grid grid-cols-2 gap-4">
              {listMembers &&
                listMembers.map((member, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-100 rounded-lg p-2"
                  >
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 rounded-full mr-3 border-2 border-white"
                        src="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
                        alt={member.username}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {member.username}
                      </span>
                    </div>
                    <div className="flex items-center cursor-pointer">
                      <X size={15} onClick={() => removeMember(member.id)} />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="mb-6">
            <h4 className="text-md font-semibold mb-3 text-gray-700">
              Search Members
            </h4>
            <input
              type="text"
              placeholder="Search users..."
              className="text-sm p-3 outline-0 border border-solid border-slate-300 w-full rounded mb-3"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <ul className="grid grid-cols-1 gap-2">
              {searchResults.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center px-3 justify-between bg-gray-100 rounded-lg p-2 cursor-pointer hover:bg-gray-200"
                >
                  <div className="flex items-center">
                    <img
                      className="w-10 h-10 rounded-full mr-3 border-2 border-white"
                      src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010_960_720.jpg"
                      alt={user.username}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {user.username}
                    </span>
                  </div>
                  <div>
                    <PlusCircle onClick={() => addMember(user)} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-3 text-gray-700">
              Shared Files
            </h4>
            <ul className="space-y-2">
              {["Project_Plan.pdf", "Design_Mockups.zip"].map((file, index) => (
                <li
                  key={index}
                  className="flex items-center bg-gray-100 rounded-lg p-2"
                >
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="text-sm text-gray-700">{file}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { GroupInfo };
