import { Chat } from "~/components/Chat";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <div className="flex min-h-screen items-center justify-center bg-cyan-950">
      <Chat />
    </div>
  );
}
