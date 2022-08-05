import React from 'react'
import { Checkbox } from 'antd'

export const StyledCheckbox = (props) => {
  return <Checkbox className="cstm-checkbox" checked={props.checked} disabled={props.disabled} />
}
