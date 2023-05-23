import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const groupCreate = z.object({
  name: z.string(),
  description: z.string(),
  approved: z.boolean(),
})

const groupUpdate = z.object({
  id: z.string(),
  group: groupCreate,
})
const groupTagCreate = z.object({
  groupId: z.string(),
  tagId: z.string(),
})
const groupTagDelete = z.object({
  id: z.string(),
})

export const groupRouter = router({
  all: publicProcedure
    .query(({ ctx }) => ctx.prisma.group.findMany({
      include: {
        Group_Tag: {
          include: {
            tag: true
          }
        },
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
  linkTag: protectedProcedure
    .input(groupTagCreate)
    .mutation(({ ctx, input }) => ctx.prisma.group_Tag.create({ data: input })),
  unlinkTag: protectedProcedure
    .input(groupTagDelete)
    .mutation(({ ctx, input }) => ctx.prisma.group_Tag.delete({ where: { id: input.id } })),
});

