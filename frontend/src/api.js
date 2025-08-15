import axios from "axios";

const API = axios.create({
  baseURL: "http://backend:9000/api" // В docker-сети backend доступен как "backend"
});

export default API;
