import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const groupCreate = z.object({
  name: z.string(),
  description: z.string(),
  approved: z.boolean(),
  tagId: z.string(),
})

const groupUpdate = z.object({
  id: z.string(),
  group: groupCreate,
})

export const groupRouter = router({
  all: publicProcedure
    .query(({ ctx }) => ctx.prisma.group.findMany({
      include: {
        tag: true
      }
    })),
  byId: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => ctx.prisma.group.findFirst({ where: { id: input } })),
  create: protectedProcedure
    .input(groupCreate)
    .mutation(({ ctx, input }) => ctx.prisma.group.create({ data: input })),
  update: protectedProcedure
    .input(groupUpdate)
    .mutation(({ ctx, input }) => ctx.prisma.group.update({ where: { id: input.id }, data: input.group })),
});

