import { DefaultSession } from 'next-auth'

import { iUserSession } from 'types/interfaces/requests/IUser'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: iUserSession & DefaultSession['user']
  }
}
