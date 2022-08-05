import React from 'react'
import { notification } from 'antd'
import { ReactComponent as CheckmarkSvg } from './checkIcon.svg'
import { ReactComponent as ErrorSvg } from './errorIcon.svg'
import { ReactComponent as CloseSVG } from './closeIcon.svg'

export const StyledNotification = (props) => {
  const { message, status } = props
  const classNameExt = status === 'success' ? 'cstm-notification__success' : 'cstm-notification__error'
  return (
    <>
      {notification.open({
        message,
        icon: status === 'success' ? <CheckmarkSvg /> : <ErrorSvg />,
        className: `cstm-notification ${classNameExt}`,
        duration: 0,
        closeIcon: <CloseSVG />,
      })}
    </>
  )
}
