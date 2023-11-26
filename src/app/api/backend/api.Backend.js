import axios from "axios";

/**
 * Instance axios to the BACKEND
 */
const apiBackEnd = axios.create({
  baseURL: "https://localhost:8000/api",
});
export default apiBackEnd;
