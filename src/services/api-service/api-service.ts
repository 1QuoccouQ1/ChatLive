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

