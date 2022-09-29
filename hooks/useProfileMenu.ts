import { useState } from 'react'

const useProfile = () => {
  const [showMenu, setShowMenu] = useState(false)

  const closeMenu = () => {
    if (showMenu) setShowMenu(false)
  }

  return {
    showMenu,
    toggleMenu: () => setShowMenu((prev) => !prev),
    closeMenu
  }
}

export default useProfile
