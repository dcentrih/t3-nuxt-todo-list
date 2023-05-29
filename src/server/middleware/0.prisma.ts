import { PrismaClient } from '@prisma/client'
import { Session } from 'next-auth'
import { prisma as prismaClient } from '~~/src/server/db'

let prisma: PrismaClient

declare module 'h3' {
  interface H3EventContext {
    prisma: PrismaClient;
    session: Session
  }
}

export default eventHandler((event) => {
  if (!prisma) {
    prisma = prismaClient
  }
  event.context.prisma = prisma
})
