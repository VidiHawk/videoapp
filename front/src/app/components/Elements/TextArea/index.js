import React from 'react'
import { Input } from 'antd'

const { TextArea } = Input

const StyledTextArea = (props, ref) => {
  const classTextFieldExt = props.disabled ? 'cstm-textarea--disabled' : ''

  return (
    <div className={`cstm-textarea ${classTextFieldExt}`}>
      <TextArea
        className="cstm-textarea__input"
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        value={props.value}
        disabled={props.disabled}
        ref={ref}
        onChange={props.onChange}
        showCount={props.showCount}
      />
    </div>
  )
}

export const STextArea = React.forwardRef(StyledTextArea)
