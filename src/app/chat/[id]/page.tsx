import ValidatedChatRoom from "@/components/ValidatedChatRoom";
import { notFound } from "next/navigation";
import { use } from "react";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default function ChatPage(props: ChatPageProps) {
  const { id } = use(props.params);
  if (!id) notFound();
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <ValidatedChatRoom id={id} />
    </div>
  );
}
