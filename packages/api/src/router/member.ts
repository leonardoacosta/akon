import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const memberCreate = z.object({
  userId: z.string(),
  groupId: z.string(),
  active: z.boolean().default(true),
})

const memberUpdate = z.object({
  id: z.string(),
  hotel: memberCreate,
})

export const memberRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.member.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.member.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(memberCreate)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.member.create({ data: input });
    }),
  update: protectedProcedure
    .input(memberUpdate)
    .mutation(({ ctx, input }) => ctx.prisma.member.update({ where: { id: input.id }, data: input.hotel })),
});

