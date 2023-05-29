/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import type { H3Event } from 'h3'
import { Session } from 'next-auth'
import { prisma } from '~/server/db'
import { getServerSession } from '#auth'

type CreateContextOptions = {
  session: Session | null;
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    prisma,
    session: opts.session
  }
}

export const createTRPCContext = async (event: H3Event) => {
  const session = await getServerSession(event)
  return createInnerTRPCContext({ session })
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson
})

/**
 * Unprotected procedure
 **/
export const createTRPCRouter = t.router

export const publicProcedure = t.procedure

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user }
    }
  })
})

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)
