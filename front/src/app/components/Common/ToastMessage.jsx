import React, {useContext} from 'react'
import CloseIcon from './../../../../public/images/close.svg'
import CheckIcon from './../../../../public/images/smallcheck.svg'
import AuthContext from './../../helpers/authContext'

const ToastMessage = (props) => {
  const context = useContext(AuthContext)
  const { message, type } = props

  const closeToastMessage = () => {
   context.hideToastMessage();
  }

  return (
    <div className={`toast-message`}>
      <div className={`toast-message-area ${type}`}>
        <span className="toast-message-icon">
          {type === 'error' && <CloseIcon width={26} />}
          {type === 'success' && <CheckIcon width={26} />}
        </span>
        <span className="toast-message-text">{message}</span>
      </div>
      <div className="toast-message-close" onClick={() => closeToastMessage()}>
        <CloseIcon width={26} />
      </div>
    </div>
  )
}

export default ToastMessage
