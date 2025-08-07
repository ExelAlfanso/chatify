import axiosInstance from "@/lib/axios";
import ChatRoom from "./ChatRoom";
import { notFound } from "next/navigation";

interface Props {
  id: string;
}

export default async function ValidatedChatRoom({ id }: Props) {
  const res = await axiosInstance.get("/chatrooms");

  const rooms = res.data.rooms as { roomID: string }[];
  const isValidRoom = rooms.some((room) => room.roomID === id);
  if (!isValidRoom) notFound();

  return <ChatRoom id={id} />;
}
