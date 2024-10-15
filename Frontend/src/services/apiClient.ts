import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://192.168.198.139:3000/api/v1", // Set the base URL once here
  headers: {
    "Content-Type": "application/json", // Set default headers if needed
  },
});

export default apiClient;
