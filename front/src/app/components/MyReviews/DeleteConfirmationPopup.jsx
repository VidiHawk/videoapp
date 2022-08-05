import React, { useState } from 'react'
import { Button, ButtonLink } from '../Elements'
import AuthContext from '../../helpers/authContext'

const AddProductReviewPopup = (props) => {
  const context = React.useContext(AuthContext)
  const { showConfirmationPopup, setShowConfirmationPopup, handleDeleteReview } = props
  const history = props.history

  const onCancel = () => {
    setShowConfirmationPopup(false)
  }

  return (
    <>
      <div className={`luxe-addreview-popup luxe-addreview-popup__desktop ${showConfirmationPopup ? 'luxe-addreview-popup--show' : ''} ${context.theme === 'dark' ? `luxe-addreview-popup--dark` : ''}`}>
        <div className={`luxe-addreview-popup__container`}>
          <h1 className='confirmation-heading'>Remove Review</h1>
          <div className='confirmation-text'>Are you sure you want to delete your review?</div>
          <Button onClick={handleDeleteReview}>Remove</Button>
          <ButtonLink btntype="secondary" onClick={onCancel}>
            Cancel
          </ButtonLink>
        </div>
      </div>
    </>
  )
}

export default AddProductReviewPopup
