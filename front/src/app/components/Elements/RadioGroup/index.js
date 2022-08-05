import React from 'react'

export const RadioGroup = (props) => {
  const { items } = props
  const [selected, setSelected] = React.useState(0)

  return (
    <div className="radio-group-container">
      {items.map((item, key) => (
        <div key={key} className={`radio-container ${selected === key && 'selected'}`}>
          <div>{item}</div>
          <input
            type="radio"
            className="custom-radio"
            checked={selected === key}
            onChange={() => setSelected(key)}
          ></input>
        </div>
      ))}
    </div>
  )
}
