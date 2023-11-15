import axios from "axios";

/**
 * Instance axios to the BACKEND
 */
const apiBackEnd = axios.create({
  baseURL: "http://localhost:8002/api",
});
export default apiBackEnd;
