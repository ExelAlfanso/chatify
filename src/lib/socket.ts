import { io } from "socket.io-client";

const socket = io("https://mywebsocketapp.onrender.com", {
  withCredentials: true,
});
export default socket;
