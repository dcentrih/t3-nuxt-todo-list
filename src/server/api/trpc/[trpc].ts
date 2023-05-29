import { createNuxtApiHandler } from 'trpc-nuxt'
import { appRouter } from '~~/src/server/trpc/root'
import { createTRPCContext } from '~~/src/server/trpc/trpc'

// export API handler
export default createNuxtApiHandler({
  router: appRouter,
  createContext: createTRPCContext
})
