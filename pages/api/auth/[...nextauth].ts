import dayjs from 'dayjs'
import NextAuth, { User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { ILogin, IAuth, INewToken, ICustomJWT, IRefreshToken } from 'types/interfaces/requests/IAuth'
import { iUserSession } from 'types/interfaces/requests/IUser'
import { apiClient } from 'utils/ApiClient'
import { stringTimeToUnix } from 'utils/helpers'

type ExtendedUserType = User & iUserSession

enum UserTypes {
  ADMIN = 1,
  USER = 2
}

const refreshAccessToken = async (prevToken: ICustomJWT) => {
  const customHeader = { Authorization: `Bearer ${prevToken.accessToken}` }
  const { refresh_token, token_expire } = await apiClient.get<IRefreshToken>({ endpoint: '/auth/refresh-token', customHeader })

  const expires = stringTimeToUnix(token_expire)?.value

  return {
    ...prevToken,
    accessToken: refresh_token,
    accessTokenExpires: expires
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        if (credentials) {
          const { username, password } = credentials as ILogin
          const customHeader = { 'Content-Type': 'application/json' }
          const body = { username, password }

          const { token, token_expire: expire } = await apiClient.post<IAuth, ILogin>({ endpoint: '/auth/login', body, customHeader })

          if (token) {
            const customHeader = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
            const user = await apiClient.get<iUserSession>({ endpoint: '/auth/info-user-login', customHeader })
            const { UsersSchools, ...session } = user

            if (user.Rol.id === UserTypes.ADMIN) {
              const { new_token: token, token_expire: expire } = await apiClient.post<INewToken, ILogin>({
                endpoint: '/auth/new-token',
                body,
                customHeader
              })

              return { ...session, token, expire }
            }

            return { ...session, expire, token }
          }
        }

        return null
      },
      credentials: {}
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: stringTimeToUnix(process.env.SESSION_DURATION ?? '1h')?.inSeconds
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        const { token: accessToken, expire, ...info } = user

        return {
          accessToken,
          accessTokenExpires: stringTimeToUnix(expire as string)?.value,
          user: { ...info }
        }
      }

      const typedToken: ICustomJWT = token as unknown as ICustomJWT

      if (dayjs().unix() < typedToken.accessTokenExpires) {
        return token
      }

      return refreshAccessToken(typedToken)
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.accessTokenExpires = token.accessTokenExpires
      session.user = token.user as ExtendedUserType

      return session
    }
  }
})
