import React from 'react'
import { Button } from 'antd'

export const PrimaryButton = (props) => {
  const {
    onClick,
    htmlType = 'submit',
    loading = false,
    btntype = 'primary',
    theme,
    btnClassname = 'undefined',
  } = props

  let btnClass = btntype === 'primary' ? 'primary-btn' : ''
  btnClass = btntype === 'secondary' ? 'secondary-btn' : btnClass
  btnClass = btnClassname !== 'undefined' ? btnClassname : btnClass
  btnClass = theme ? (theme === 'black' ? `${btnClass} button-black` : `${btnClass} button-white`) : btnClass
  return (
    <Button className={btnClass} onClick={onClick} htmlType={htmlType} loading={loading} disabled={props.disabled}>
      {props.children}
    </Button>
  )
}
