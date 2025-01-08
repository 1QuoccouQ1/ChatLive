import { X } from "lucide-react";
import React from "react";
import { AddChatsProps } from "./type";
import { useAddChats } from "./hook";

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
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Add Groups</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 max-h-[80vh] overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-2 text-gray-700">
              Groups name
            </h3>
            <input
              type="text"
              placeholder="Enter Groups name ..."
              className="text-sm p-3 outline-0 border border-solid border-slate-300 w-full rounded"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-medium">Private</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
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
                  className="flex items-center bg-gray-100 rounded-lg p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => addMember(user)}
                >
                  <img
                    className="w-10 h-10 rounded-full mr-3 border-2 border-white"
                    src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010_960_720.jpg"
                    alt={user.username}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user.username}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-md font-semibold mb-3 text-gray-700">
              Selected Members ({selectedMembers.length})
            </h4>
            <ul className="grid grid-cols-2 gap-4">
              {selectedMembers.map((member) => (
                <li
                  key={member.id}
                  className="flex items-center bg-gray-100 rounded-lg p-2"
                >
                  <img
                    className="w-10 h-10 rounded-full mr-3 border-2 border-white"
                    src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010_960_720.jpg"
                    alt={member.username}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {member.username}
                  </span>
                  <button
                    className="ml-auto text-red-500 hover:text-red-700 text-xs"
                    onClick={() => removeMember(member.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center">
            <p
              className="px-3 py-2 bg-blue-500 text-white rounded cursor-pointer hover:opacity-90"
              onClick={createGroup}
            >
              Create Group
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddChats };
