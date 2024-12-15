import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  // Salvar uma mensagem (usuário ou assistente)
  saveMessage: publicProcedure
    .input(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.message.create({
        data: {
          role: input.role,
          content: input.content,
        },
      });
    }),

  // Obter o histórico das mensagens
  getMessages: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.message.findMany({
      orderBy: { createdAt: "asc" },
    });
  }),
});
