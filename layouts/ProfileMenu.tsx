import { Divider, Tooltip } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'

import { PdvIcons } from '@Uikit/PdvIcons'

type TProfileMenu = {
  visible: boolean
}

const ProfileMenu: React.FC<TProfileMenu> = (props) => {
  const { data: session } = useSession()
  const isLargerName = session?.user?.names
  const fullname = `${session?.user?.names} ${session?.user?.paternal_surnames}`

  return (
    <div className={`menu ${props.visible ? 'show' : ''}`}>
      <div className="my-2.5">
        <h6 className="flex h-4 min-h-full w-40 items-center text-blue-500">
          ¡Hola,
          <Tooltip title={isLargerName ? <span>{fullname}</span> : false}>
            <p className="ml-1 block">{fullname}</p>
          </Tooltip>
          !
        </h6>
      </div>

      <Divider variant="middle" />

      <div className="my-2.5">
        <div className="flex cursor-pointer items-center gap-1">
          <PdvIcons name="Setting" color="blue-500" set="curved" />
          <p className="subtitle1 text-gray-500">Configuración</p>
        </div>
      </div>

      <div className="my-2.5">
        <div className="flex cursor-pointer items-center gap-1">
          <PdvIcons name="Unlock" color="blue-500" set="curved" />
          <p className="subtitle1 text-gray-500">Cambiar contraseña</p>
        </div>
      </div>

      <div className="my-2.5">
        <button onClick={() => signOut()}>
          <div className="flex cursor-pointer items-center gap-1">
            <PdvIcons name="Logout" color="rose-500" set="curved" />
            <p className="subtitle1 text-rose-500">Cerrar sesión</p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default ProfileMenu
