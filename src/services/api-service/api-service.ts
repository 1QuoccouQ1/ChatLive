export const API_URL = "http://localhost:8000/api";

async function fetchAPI(endpoint, method = "GET", body = null) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: body ? JSON.stringify(body) : null,
  });
  return response.json();
}
export const registerUser = (user) => fetchAPI("/users/register", "POST", user);
export const loginUser = (user) => fetchAPI("/users/login", "POST", user);

export const getMembers = () => fetchAPI("/list_members");
export const getAllGroups = () => fetchAPI("/groups");
export const createGroupApi = (data) => fetchAPI("/create_group", "POST", data);
export const getSearch = (data) => fetchAPI("/search", "POST", data);
export const getSearchUser = (data) => fetchAPI("/searchUser", "POST", data);
export const getMessagesGroup = (data) => fetchAPI(`/groups/${data}/messages`);
export const getMessagesUser = (data) => fetchAPI(`/messages/${data}`);
export const sendMessagesUser = (data) =>
  fetchAPI(`/send_message`, "POST", data);
export const sendMessagesGroup = (groupId, data) =>
  fetchAPI(`/groups/${groupId}/messages`, "POST", data);
export const delMemberToGroup = (groupId, userId) =>
  fetchAPI(`/groups/${groupId}/members/${userId}`, "DELETE");
export const addMemberToGroup = (groupId, data) =>
  fetchAPI(`/groups/${groupId}/add_members`, "POST", data);
