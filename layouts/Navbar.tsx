import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Grow } from '@mui/material'

import { PdvIcons, TIconNames } from '@Uikit/PdvIcons'
import { routes } from 'utils/routes'

const Navbar = () => {
  const { pathname } = useRouter()
  return (
    <aside
      className="inset-0 top-24 z-20  h-screen w-[305px] shrink-0 overflow-y-auto bg-sky-50"
      style={{ boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.13)' }}
    >
      <nav>
        <ul className="flex flex-col items-center justify-center">
          <NavLink asLink route={routes.private.home}>
            <NavItem name="Home" iconName="Home" active={routes.private.home === pathname} />
          </NavLink>
          <NavSubMenu name="Configuraciones" iconName="Setting" active={pathname.includes('configuraciones')}>
            <NavLink asLink route={routes.private.schools}>
              <NavSubMenuItem name="Colegios" active={routes.private.schools === pathname} />
            </NavLink>
            <NavLink asLink route={routes.private.profiles}>
              <NavSubMenuItem name="Perfiles" active={routes.private.profiles === pathname} />
            </NavLink>
            <NavLink asLink route={routes.private.subjects}>
              <NavSubMenuItem name="Asignaturas Curriculares" active={routes.private.subjects === pathname} />
            </NavLink>
            <NavLink asLink route={routes.private.teachingTypes}>
              <NavSubMenuItem name="Tipos de Enseñanza" active={routes.private.teachingTypes === pathname} />
            </NavLink>
            <NavLink asLink route={routes.private.grades}>
              <NavSubMenuItem name="Niveles" active={routes.private.grades === pathname} />
            </NavLink>
            <NavLink asLink route={routes.private.platforms}>
              <NavSubMenuItem name="Plataformas" active={routes.private.platforms === pathname} />
            </NavLink>
            <NavLink asLink route={routes.private.holidays}>
              <NavSubMenuItem name="Feriados" active={routes.private.holidays === pathname} />
            </NavLink>
          </NavSubMenu>
        </ul>
      </nav>
    </aside>
  )
}

type TNavItem = {
  iconName?: TIconNames
  name: string
  active: boolean
}

const NavItem: React.FC<TNavItem> = (props) => {
  return (
    <li
      className={`w-full cursor-pointer border-b border-white px-8 py-5 text-white transition duration-100 ease-in hover:bg-blue-100 ${
        props.active ? 'bg-blue-100' : ''
      }`}
    >
      {props.iconName && <PdvIcons name={props.iconName} color="blue-500" size="small" />}
      <span className="subtitle1 select-none pl-1 font-normal uppercase text-blue-500">{props.name}</span>
    </li>
  )
}

type TNavSubMenu = {
  name: string
  iconName?: TIconNames
  active?: boolean
  children: React.ReactNode
}

const NavSubMenu: React.FC<TNavSubMenu> = (props) => {
  const [showItems, setShowItems] = useState(!!props.active)
  const [noTransition, setNoTransition] = useState<string | null>('hidden')

  useEffect(() => {
    if (!showItems) setTimeout(() => setNoTransition('hidden'), 300)
    if (showItems) setTimeout(() => setNoTransition(null), 0)
  }, [showItems])

  return (
    <>
      <div
        className={`w-full cursor-pointer border-b border-white px-8 py-5 text-white transition  duration-100 ease-in hover:bg-blue-100 ${
          props.active ? 'bg-blue-100' : ''
        }`}
        onClick={() => setShowItems((prev) => !prev)}
      >
        {props.iconName && <PdvIcons name={props.iconName} color="blue-500" size="small" />}
        <span className="subtitle1 select-none pl-1 font-normal uppercase text-blue-500">{props.name}</span>
      </div>
      <Grow in={showItems && !noTransition} style={{ transformOrigin: '0 0 0' }} {...(showItems ? { timeout: 300 } : {})}>
        <ul className={`flex w-full flex-col items-center justify-center bg-white ${noTransition}`}>{props.children}</ul>
      </Grow>
    </>
  )
}

type TNavSubMenuItem = {
  name: string
  active: boolean
}

const NavSubMenuItem: React.FC<TNavSubMenuItem> = (props) => {
  return (
    <li
      className={`flex w-full cursor-pointer items-center border-b border-gray-100 px-12 py-5 hover:text-blue-500 ${
        props.active ? 'text-blue-500' : 'text-gray-500'
      }`}
    >
      <PdvIcons name="KeyArrowRight" color="blue-500" size="small" />
      <span className="subtitle2 select-none pl-1">{props.name}</span>
    </li>
  )
}

type TNavLink = {
  asLink?: boolean
  route?: string
  children: JSX.Element
}

const NavLink: React.FC<TNavLink> = (props) => {
  if (props.asLink && props.route)
    return (
      <Link href={props.route} passHref>
        <a className="w-full">{props.children}</a>
      </Link>
    )

  return props.children
}

export default Navbar
