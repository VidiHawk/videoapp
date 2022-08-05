import React from 'react'
import BackArrow from './../../../../../public/images/arrow_left.svg'

export const BackButton = (props) => {
  const { onClick } = props
  return <BackArrow onClick={onClick} className="btn-back" />
}
