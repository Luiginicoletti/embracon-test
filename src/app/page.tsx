import { Chat } from "~/components/Chat";
import { api } from "~/trpc/server";

export default async function Home() {
  void api.post.getMessages.prefetch();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-cyan-950 via-cyan-900 to-cyan-950">
      <Chat />
    </div>
  );
}
