import { router, protectedProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const departments = z.enum([
    "isAdmin",

    "isGuests",
    "isGuest",

    "isProgramming",
    "isPanelist",

    "isVendors",
    "isVendor",

    "isVolunteers",
    "isVolunteer",
])

export type Departments = z.infer<typeof departments>

const getFilter = z.object({
    id: z.string().optional(),
    department: departments.optional(),
})

const getById = z.string()

const toggleDepartment = z.object({
    id: z.string(),
    department: departments,
})
const checkUser = z.object({
    email: z.string().email()
})
const addToDepartment = z.object({
    email: z.string().email(),
    phoneNumber: z.string().optional(),
    department: departments,
})

export const userRouter = router({
    all: protectedProcedure.input(getFilter).query(async ({ ctx, input }) => {
        const users = await clerkClient.users.getUserList();
        if (input.department !== undefined) {
            return users.filter(user => user.publicMetadata[input.department as string])
        }
        console.log(users, input);
        return users;
    }),
    byId: protectedProcedure
        .input(getById)
        .query(({ input }) => clerkClient.users.getUser(input)),
    toggleDepartment: protectedProcedure
        .input(toggleDepartment)
        .mutation(async ({ input }) => {
            const user = await clerkClient.users.getUser(input.id)
            const metadata = user.publicMetadata
            metadata[input.department as string] = !metadata[input.department as string]
            await clerkClient.users.updateUser(input.id, { publicMetadata: metadata })
            return user
        }),
    checkIfUserExists: protectedProcedure
        .input(checkUser)
        .query(async ({ input }) => {
            const emailAddress = [input.email];
            const users = await clerkClient.users.getUserList({ emailAddress, limit: 1 });
            return users.length > 0 ? true : false;
        }),
    addToDepartment: protectedProcedure
        .input(addToDepartment)
        .mutation(async ({ input }) => {
            const emailAddress = [input.email];
            const users = await clerkClient.users.getUserList({ emailAddress, limit: 1 });
            let user = users[0] ?? null;

            try {
                // If the user doesn't exist, create them
                if (!user) {

                    user = await clerkClient.users.createUser({
                        emailAddress: emailAddress,
                        phoneNumber: [input.phoneNumber!],
                        skipPasswordRequirement: true
                    });

                    const invites = await clerkClient.invitations.getInvitationList();

                    // revoke all invitations
                    for (const invite of invites.filter(s => s.emailAddress === emailAddress[0])) await clerkClient.invitations.revokeInvitation(invite.id);
                    // await clerkClient.invitations.revokeInvitation({});
                    await clerkClient.invitations.createInvitation({
                        emailAddress: emailAddress[0]!,
                    });
                }

                // Add the user to the department
                const metadata = user.publicMetadata
                metadata[input.department as string] = true
                await clerkClient.users.updateUser(user.id, { publicMetadata: metadata })
                return user
            }
            catch (e: any) {
                console.log(JSON.stringify(e))
                throw new TRPCError({ code: "BAD_REQUEST", message: e.errors[0].message });
            }
        }),
});

