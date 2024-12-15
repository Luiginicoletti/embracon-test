"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useRef } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { Loader2, Send, LogIn } from "lucide-react";

export function Chat() {
  const { user, isSignedIn } = useUser();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        scrollRef.current?.scrollTo({ top: 200, behavior: "instant" });
      }
    }, 50); // Pequeno atraso para garantir que o DOM seja atualizado
    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <Card className="w-[440px] border-white bg-gradient-to-tr from-violet-200 via-blue-50 to-cyan-50 shadow-2xl shadow-red-800/60">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="font-extrabold text-slate-950">
            Hire Me Assistant
          </span>
          <div>
            {isSignedIn ? (
              <UserButton />
            ) : (
              <Button
                asChild
                variant="outline"
                className="border-red-900 text-red-900"
              >
                <a href="/sign-in" className="flex items-center gap-1">
                  <LogIn size={16} />
                  Login
                </a>
              </Button>
            )}
          </div>
        </CardTitle>
        <CardDescription className="-mt-2 text-slate-600/90">
          The AI-Powered Interview Experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea
          type="always"
          ref={scrollRef}
          className="h-[550px] w-full space-y-4 pb-4 pr-4"
        >
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 flex items-center gap-3 text-sm text-slate-700"
            >
              <Avatar>
                <AvatarFallback>
                  {message.role === "user" ? "EC" : "LN"}
                </AvatarFallback>
                {message.role === "user" && isSignedIn && user?.imageUrl ? (
                  <AvatarImage src={user.imageUrl} />
                ) : (
                  <AvatarImage src="https://github.com/luiginicoletti.png" />
                )}
              </Avatar>
              <p className="wrap overflow-auto leading-relaxed">
                <span className="block font-bold text-cyan-900">
                  {message.role === "user" ? "Embracon" : "Luigi Nicoletti"}:
                </span>
                {message.content}
              </p>
            </motion.div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            placeholder="How can I help you?"
            className="focus:border-red-5800 border border-red-800 focus:ring-red-800"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit" className="bg-red-950 hover:bg-red-950">
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
