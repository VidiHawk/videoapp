import React from 'react'
import { Select } from 'antd'
import { ReactComponent as IconDown } from './arrow-down-icon.svg'

const { Option } = Select

export const StyledSelect = (props) => {
  const classExt = props.disabled ? 'cstm-select--disabled' : ''
  return (
    <div className="cstm-selectwrapper">
      <Select
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        className={`cstm-select ${classExt}`}
        disabled={props.disabled}
        suffixIcon={<IconDown />}
      >
        {props.options.map((option, key) => (
          <Option value={option.value} key={key}>
            {option.title}
          </Option>
        ))}
      </Select>
    </div>
  )
}
