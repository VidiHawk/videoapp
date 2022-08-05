import React from 'react'
import { Button } from 'antd'

export const ButtonLink = (props) => {
  const { onClick, htmlType = 'submit', loading = false, btntype = 'primary', className } = props

  let btnClass = btntype === 'primary' ? 'primary-btn-link' : ''
  btnClass = btntype === 'secondary' ? 'secondary-btn-link' : btnClass
  btnClass = className ? `${btnClass} ${className}` : `${btnClass} btn-link`
  return (
    <Button className={btnClass} onClick={onClick} htmlType={htmlType} loading={loading} type="link">
      {props.children}
    </Button>
  )
}
