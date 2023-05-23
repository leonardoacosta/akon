import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const eventCreate = z.object({
    name: z.string(),
    description: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    location: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
})

const eventUpdate = z.object({
    id: z.string(),
    event: eventCreate,
})

export const eventRouter = router({
    all: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.event.findMany();
    }),
    getCurrent: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.event.findFirst({
            where: { endDate: { gt: new Date() } },
            include: {
                hotels: {
                    include: { rooms: true }
                }
            }
        });
    }),
    byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.event.findFirst({ where: { id: input } });
    }),
    create: protectedProcedure
        .input(eventCreate)
        .mutation(({ ctx, input }) => {
            return ctx.prisma.event.create({ data: input });
        }),
    update: protectedProcedure
        .input(eventUpdate)
        .mutation(({ ctx, input }) => ctx.prisma.event.update({ where: { id: input.id }, data: input.event })),
});

