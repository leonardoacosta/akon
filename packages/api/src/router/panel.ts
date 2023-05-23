import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const panelCreate = z.object({
  name: z.string(),
  description: z.string(),
  start: z.coerce.date(),
  end: z.coerce.date(),
  groupId: z.string(),
  eightteenPlus: z.boolean().default(false),
  approved: z.boolean().default(false),
  approvalSent: z.coerce.date().nullable(),
  denied: z.boolean().default(false),
  deniedReason: z.string().nullable(),
  deniedSent: z.coerce.date().nullable(),
  tagId: z.string(),

})

const panelUpdate = z.object({
  id: z.string(),
  panel: panelCreate,
})

const panelSearch = z.object({
  guestId: z.string().optional(),
  approved: z.boolean().optional(),
  tagId: z.string().optional(),
  roomId: z.string().optional(),
})

export const panelRouter = router({
  all: publicProcedure
    .input(panelSearch)
    .query(({ ctx, input }) => ctx.prisma.panel.findMany({
      where: {
        OR: [
          { groupId: input.guestId },
          { approved: input.approved },
          { tagId: input.tagId },
          { roomId: input.roomId }
        ]
      },
      include: {
        tag: true,
      }
    })),
  byId: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => ctx.prisma.panel.findFirst({ where: { id: input } })),
  create: protectedProcedure
    .input(panelCreate)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.panel.create({ data: input });
    }),
  update: protectedProcedure
    .input(panelUpdate)
    .mutation(({ ctx, input }) => ctx.prisma.panel.update({ where: { id: input.id }, data: input.panel })),
});

