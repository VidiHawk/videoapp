import React from 'react'
import { Input } from 'antd'
import { ReactComponent as CheckMarkSvg } from './checkMark.svg'
import { ReactComponent as ErrorMarkSvg } from './errorMark.svg'

const TextField = (props, ref) => {
  let classTextFieldExt = props.isSuccess ? 'cstm-textfield--success' : ''
  classTextFieldExt = props.isError ? 'cstm-textfield--error' : classTextFieldExt
  classTextFieldExt = props.disabled ? 'cstm-textfield--disabled' : classTextFieldExt

  let classInputExt = props.disabled ? 'cstm-textfield__input--disabled' : ''

  let svgIcon = props.isSuccess ? <CheckMarkSvg /> : ''
  svgIcon = props.isError ? <ErrorMarkSvg /> : svgIcon
  return (
    <div className={`cstm-textfield ${classTextFieldExt}`}>
      {props.label && <label className="cstm-textfield__label">{props.label}</label>}
      <Input
        className={`cstm-textfield__input ${classInputExt}`}
        placeholder={props.placeholder}
        type={props.type}
        defaultValue={props.defaultValue}
        value={props.value}
        inputMode={props.inputMode}
        disabled={props.disabled}
        ref={ref}
        onChange={props.onChange}
        suffix={svgIcon}
      />
      {props.errorMessage && <span className="cstm-textfield__error-message">{props.errorMessage}</span>}
    </div>
  )
}

export const STextField = React.forwardRef(TextField)
