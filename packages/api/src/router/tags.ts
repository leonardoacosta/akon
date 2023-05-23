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

export const tagRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.tag.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.tag.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(tagCreate)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.tag.create({ data: input });
    }),
  update: protectedProcedure
    .input(tagUpdate)
    .mutation(({ ctx, input }) => ctx.prisma.tag.update({ where: { id: input.id }, data: input.tag })),
});

