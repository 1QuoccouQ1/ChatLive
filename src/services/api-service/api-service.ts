import axios from "axios";

export const API_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

async function axiosAPI(endpoint, method = "GET", body = null) {
  try {
    const response = await axiosInstance({
      url: endpoint,
      method,
      data: body, 
    });
    return response.data; 
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    throw error;
  }
}

export const registerUser = (user) => axiosAPI("/users/register", "POST", user);
export const loginUser = (user) => axiosAPI("/users/login", "POST", user);

export const getMembers = () => axiosAPI("/list_members");
export const getAllGroups = () => axiosAPI("/groups");
export const createGroupApi = (data) => axiosAPI("/create_group", "POST", data);
export const getSearch = (data) => axiosAPI("/search", "POST", data);
export const getSearchUser = (data) => axiosAPI("/searchUser", "POST", data);
export const getMessagesGroup = (data) => axiosAPI(`/groups/${data}/messages`);
export const getMessagesUser = (data) => axiosAPI(`/messages/${data}`);
export const sendMessagesUser = (data) => axiosAPI(`/send_message`, "POST", data);
export const sendMessagesGroup = (groupId, data) =>
  axiosAPI(`/groups/${groupId}/messages`, "POST", data);
export const delMemberToGroup = (groupId, userId) =>
  axiosAPI(`/groups/${groupId}/members/${userId}`, "DELETE");
export const delGroup = (groupId) => axiosAPI(`/groups/${groupId}`, "DELETE");
export const addMemberToGroup = (groupId, data) =>
  axiosAPI(`/groups/${groupId}/add_members`, "POST", data);
