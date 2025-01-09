import { FileText, PlusCircle, PlusCircleIcon, X } from "lucide-react";
import React from "react";
import { GroupInfoProps } from "./type";
import { useGroupInfo } from "./hook";

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
                    className="flex items-center justify-between bg-gray-100 rounded-lg p-2 relative"
                  >
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 rounded-full mr-3 border-2 border-white"
                        src={member.avatar}
                        alt={member.username}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {member.username}
                      </span>
                    </div>
                    <div className="flex items-center cursor-pointer">
                      <X size={15} onClick={() => removeMember(member.id)} />
                    </div>
                    {/* {member.pivot.role &&  member.pivot.role == "admin" && (
                      <div className="absolute top-1 right-2">
                        <Crown size={12} color="red" />
                      </div>
                    )} */}
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
              {searchResults &&
                searchResults.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center px-3 justify-between bg-gray-100 rounded-lg p-2 cursor-pointer hover:bg-gray-200"
                  >
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 rounded-full mr-3 border-2 border-white"
                        src={user.avatar}
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
          <div className="mt-6">
            <button
              onClick={handleDeleteGroup}
              className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
