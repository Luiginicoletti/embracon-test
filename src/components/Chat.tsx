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

export interface ChatProps {}

export function Chat(props: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="w-[440px] bg-cyan-50">
      <CardHeader>
        <CardTitle>Hire me assistant</CardTitle>
        <CardDescription>The AI-Powered Interview Experience</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[550px] w-full space-y-4 pb-4 pr-4">
          {messages.map((message) => {
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 flex items-center gap-3 text-sm text-slate-600"
              >
                {message.role === "user" && (
                  <Avatar>
                    <AvatarFallback>EC</AvatarFallback>
                    <AvatarImage src="https://github.com/luiginicoletti.png" />
                  </Avatar>
                )}
                {message.role === "assistant" && (
                  <Avatar>
                    <AvatarFallback>LN</AvatarFallback>
                    <AvatarImage src="https://github.com/luiginicoletti.png" />
                  </Avatar>
                )}

                <p className="wrap overflow-auto text-wrap leading-relaxed">
                  <span className="block font-bold text-slate-700">
                    {message.role === "user" ? "Embracon" : "Luigi Nicoletti"}:
                  </span>
                  {message.content}
                </p>
              </motion.div>
            );
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            placeholder="How can i help you? "
            className="border border-cyan-800/30"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit" className="bg-cyan-950 hover:bg-cyan-900">
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
