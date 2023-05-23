import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const panelCreate = z.object({
  name: z.string(),
  description: z.string(),
  start: z.string(),
  end: z.string(),
  groupId: z.string(),
  eightteenPlus: z.boolean().default(false),
  approved: z.boolean().default(false),
  approvalSent: z.coerce.date().optional(),
  denied: z.boolean().default(false),
  deniedReason: z.string().optional(),
  denialSent: z.coerce.date().optional(),
  tagId: z.string(),

})

const panelUpdate = z.object({
  id: z.string(),
  panel: panelCreate,
})

export const panelRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.panel.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.panel.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(panelCreate)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.panel.create({ data: input });
    }),
  update: protectedProcedure
    .input(panelUpdate)
    .mutation(({ ctx, input }) => ctx.prisma.panel.update({ where: { id: input.id }, data: input.panel })),
});

