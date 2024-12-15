import { Chat } from "~/components/Chat";
import { api } from "~/trpc/server";

export default async function Home() {
  void api.post.getMessages.prefetch();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-[#2f0502] via-black to-[#2f0502]">
      <Chat />
    </div>
  );
}
