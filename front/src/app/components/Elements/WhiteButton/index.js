import React from 'react'
import { Button } from 'antd'

export const WhiteButton = (props) => {
  const { onClick, htmlType = 'submit', loading = false } = props
  return (
    <Button className="white-btn" onClick={onClick} htmlType={htmlType} loading={loading}>
      {props.children}
    </Button>
  )
}
