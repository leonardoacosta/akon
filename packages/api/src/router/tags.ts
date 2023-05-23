import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const tagCreate = z.object({
  name: z.string(),
  classNames: z.string(),
  type: z.enum(["PANEL", "GROUP"]),
})

const tagUpdate = z.object({
  id: z.string(),
  tag: tagCreate,
})

const tagSelect = z.object({
  type: z.enum(["PANEL", "GROUP"]).optional(),
})

export const tagRouter = router({
  all: publicProcedure
    .input(tagSelect)
    .query(({ ctx, input }) => ctx.prisma.tag.findMany({
      where: {
        OR: [
          { type: { equals: input.type } },
        ]
      }
    })),
  byId: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => ctx.prisma.tag.findFirst({ where: { id: input } })),
  create: protectedProcedure
    .input(tagCreate)
    .mutation(({ ctx, input }) => ctx.prisma.tag.create({ data: input })),
  update: protectedProcedure
    .input(tagUpdate)
    .mutation(({ ctx, input }) => ctx.prisma.tag.update({ where: { id: input.id }, data: input.tag })),
});

