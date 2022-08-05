import React from 'react'
import { Radio } from 'antd'

export const StyledRadioButton = (props) => {
  return <Radio className="cstm-radio" disabled={props.disabled} />
}
