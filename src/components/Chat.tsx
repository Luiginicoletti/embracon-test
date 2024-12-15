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
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="w-[440px] border-cyan-400 bg-gradient-to-tr from-indigo-100 via-cyan-50 to-indigo-100 shadow-2xl shadow-cyan-600/90">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="font-extrabold text-cyan-900">
            Hire Me Assistant
          </span>
          <div>
            {isSignedIn ? (
              <UserButton />
            ) : (
              <Button
                asChild
                variant="outline"
                className="border-cyan-900 text-cyan-900"
              >
                <a href="/sign-in" className="flex items-center gap-1">
                  <LogIn size={16} />
                  Login
                </a>
              </Button>
            )}
          </div>
        </CardTitle>
        <CardDescription className="-mt-2 text-cyan-700">
          The AI-Powered Interview Experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[550px] w-full space-y-4 pb-4 pr-4">
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
            className="border border-cyan-800/30 focus:border-cyan-500 focus:ring-cyan-500"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit" className="bg-cyan-950 hover:bg-cyan-900">
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
