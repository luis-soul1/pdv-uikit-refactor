import Link from 'next/link'
import { useRef } from 'react'

import { useSession } from 'next-auth/react'

import { PdvIcons } from '@Uikit/PdvIcons'
import Logo from 'commons/Logo'
import useOutsideTrigger from 'hooks/useOutsideTrigger'
import useProfileMenu from 'hooks/useProfileMenu'
import ProfileMenu from 'layouts/ProfileMenu'
import { routes } from 'utils/routes'

const Header: React.FC = () => {
  const { data: session } = useSession()

  const profileMenuRef = useRef<HTMLLIElement>(null)
  const { toggleMenu, showMenu, closeMenu } = useProfileMenu()
  useOutsideTrigger(profileMenuRef, closeMenu)

  return (
    <header className="sticky top-0 z-50 w-full bg-blue-500 py-5">
      <div className="flex h-full items-center justify-between">
        <Link href={routes.private.home} passHref>
          <div className="flex cursor-pointer items-center justify-center gap-3 pl-8">
            <div className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white">
              <Logo width={34} height={34} color="var(--blue-500)" />
            </div>
            <div>
              <h4 className="subtitle1 mb-1 text-white">Plataformas educativas PDV</h4>
              <span className="body1 rounded bg-white py-px px-1 text-center font-semibold text-blue-500">2021</span>
            </div>
            <div className="h-14 w-px bg-white" />
            <h2 className="subtitle2 text-semibold mb-1 text-white">Administrador</h2>
          </div>
        </Link>

        <nav className="pr-8">
          <ul className="flex items-center justify-center gap-4">
            <li className="text-white ">{`${session?.user?.names ?? ''} ${session?.user?.paternal_surnames ?? ''}`}</li>
            <li className="" ref={profileMenuRef} onClick={toggleMenu}>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                <PdvIcons name="User" color="blue-500" size="small" />
              </div>
              <ProfileMenu visible={showMenu} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
