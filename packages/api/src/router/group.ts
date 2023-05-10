import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const groupCreate = z.object({
  name: z.string(),
  description: z.string(),
})

const groupUpdate = z.object({
  id: z.string(),
  group: groupCreate,
})

export const groupRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.group.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.group.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(groupCreate)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.group.create({ data: input });
    }),
  update: protectedProcedure
    .input(groupUpdate)
    .mutation(({ ctx, input }) => ctx.prisma.group.update({ where: { id: input.id }, data: input.group })),
});

