import React from 'react'
import { Calendar as AntdCalendar } from 'antd'

export const Calendar = (props) => {
  const { theme, btnClassname = 'undefined', defaultValue, onChange } = props
  let btnClass = btnClassname ? btnClassname : ''
  btnClass = theme ? (theme === 'black' ? `${btnClass} button-black` : `${btnClass} button-white`) : btnClass

  return (
    <AntdCalendar
      onPanelChange={onChange}
      onSelect={onChange}
      defaultValue={defaultValue}
      className={btnClass}
      fullscreen={false}
    />
  )
}
