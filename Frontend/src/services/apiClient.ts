import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  // baseURL: "http://192.168.158.139:3000/api/v1", // Set the base URL once here
  // baseURL: "http://192.168.45.139:3000/api/v1", // Set the base URL once here
  // baseURL: "http://192.168.207.139:3000/api/v1", // Set the base URL once here
  // baseURL: "http://192.168.207.139:3000/api/v1", // Set the base URL once here
  // baseURL: "http://192.168.136.139:3000/api/v1", // Set the base URL once here
  baseURL: "http://192.168.126.139:3000/api/v1", // Set the base URL once here
  headers: {
    "Content-Type": "application/json", // Set default headers if needed
  },
});

export default apiClient;
