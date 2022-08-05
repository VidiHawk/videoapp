import React from 'react'
import CloseIcon from './../../../../../public/images/close.svg'

export const CloseButton = (props) => {
  const { onClick } = props
  return (
    <div className="close-container" onClick={onClick} onKeyPress={onClick} role="button" tabIndex="0">
      <CloseIcon />
    </div>
  )
}
