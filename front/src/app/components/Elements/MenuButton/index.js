import React from 'react'
import MenuIcon from './../../../../../public/images/menu_medium_burger.svg'
import MenuIconBlack from './../../../../../public/images/menu_black.svg'

export const MenuButton = (props) => {
  const { theme = 'white', onClick } = props
  return (
    <div
      className={`menu-container-${theme} d-none d-md-flex`}
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      tabIndex="0"
    >
      {theme === 'white' ? <MenuIcon /> : <MenuIconBlack />}
    </div>
  )
}
