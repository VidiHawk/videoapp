import React from 'react'
import { Input } from 'antd'
import SendIcon from './../../../../../public/images/send_medium.svg'
const { TextArea } = Input

export const InputComment = (props) => {
  const { onSend } = props
  const [value, setValue] = React.useState('')

  const onChange = ({ target: { value } }) => {
    setValue(value)
  }

  const onEnterPress = (e, value) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      onSend(value)
      setValue('')
    }
  }

  return (
    <div className="comment-area">
      <TextArea
        className="input-comment"
        value={value}
        size="large"
        onChange={onChange}
        placeholder="Add a comment..."
        onKeyDown={(e) => onEnterPress(e, value)}
      />
      <div className="send-icon" onClick={(e) => onSend(value)}> <SendIcon/> </div>
    </div>
  )
}
