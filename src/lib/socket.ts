import { io } from "socket.io-client";

const socket = io(
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://mywebsocketapp.onrender.com",
  {
    withCredentials: true,
  }
);
export default socket;
