import React from 'react'
import { Switch } from 'antd'

export const PrimarySwitch = (props) => {
  const { onChange, checked } = props
  return (
    <Switch className="switch" onChange={onChange} checked={checked} {...props}>
      {props.children}
    </Switch>
  )
}
