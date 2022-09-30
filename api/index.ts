import axios from "axios";
import { InewUser } from "../interfaces/Iuser";
import config from "../config";

const axiosInstance = axios.create({ baseURL: config.BASE_URL });

const register = async (credentials: InewUser) =>
  axiosInstance.post("/api/user/register", credentials);

const login = async (credentials: InewUser) =>
  axiosInstance.post("/api/user/login", credentials);

const validate = async (token: string) =>
  axiosInstance.get("/api/user/validate", {
    headers: { Authorization: `Bearer ${token}` },
  });

const api = { register, login, validate };
export default api;
