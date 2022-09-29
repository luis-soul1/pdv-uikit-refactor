import { useRouter } from 'next/router'

import { useSession } from 'next-auth/react'

import PermissionsLoader from 'commons/PermissionsLoader'
import { routes } from 'utils/routes'

type TAuthGuard = {
  children: JSX.Element
}

const AuthGuard: React.FC<TAuthGuard> = (props) => {
  const { status } = useSession()
  const router = useRouter()

  const authRoutesList = Object.values(routes.auth)
  const publicRoutesList = Object.values(routes.public)

  if (status === 'loading') return <PermissionsLoader />
  if (publicRoutesList.includes(router.pathname)) return props.children
  if (status === 'unauthenticated' && !authRoutesList.includes(router.pathname)) router.push(routes.auth.login)
  if (status === 'authenticated' && authRoutesList.includes(router.pathname)) router.push(routes.private.home)

  return props.children
}

export default AuthGuard
