import React, { useState } from 'react'
import { Button, ButtonLink } from '../Elements'
import AuthContext from './../../helpers/authContext'
import AddTextReview from './AddTextReview'
import AddVideoReview from './AddVideoReview'

const AddProductReviewPopup = (props) => {
  const context = React.useContext(AuthContext)
  const { showProductReviewPopup, setshowProductReviewPopup, reviewProduct, mobile } = props
  const history = props.history

  const [showTextArea, setShowTextArea] = useState(false)
  const [showVideoArea, setShowVideoArea] = useState(false)

  const onAddTextReview = () => {
    if(!mobile.isMobile) return setShowTextArea(true)
    history.push({
      pathname: `/my-reviews/add-text-review/${reviewProduct.slug}`,
      state: {
        product: reviewProduct
      }
    })
  }

  const onAddVideoReview = () => {
    if(!mobile.isMobile) return setShowVideoArea(true)
    history.push({
      pathname: `/my-reviews/add-video-review/${reviewProduct.slug}`,
      state: {
        product: reviewProduct
      }
    })
  }

  const onCancel = () => {
    setshowProductReviewPopup(false)
  }

  return (
    <>
      <div className={`luxe-addreview-popup luxe-addreview-popup__desktop ${showProductReviewPopup ? 'luxe-addreview-popup--show' : ''} ${context.theme === 'dark' ? `luxe-addreview-popup--dark` : ''}`}>
        { !showTextArea && !showVideoArea && <div className={`luxe-addreview-popup__container`}>
          <Button onClick={onAddTextReview}> Add Text Review</Button>
          <div className="luxe-primary-text">Earn 10 Points</div>
          <div className="luxe-separator">
            <span>OR</span>
          </div>
          <Button onClick={onAddVideoReview}> Add Video Review</Button>
          <div className="luxe-primary-text">Earn 10 Points</div>
          <ButtonLink btntype="secondary" onClick={onCancel}>
            Cancel
          </ButtonLink>
        </div> }
        { showTextArea && <AddTextReview {...props} product={reviewProduct} setShowTextArea={setShowTextArea} hidePopup={setshowProductReviewPopup} /> }
        { showVideoArea && <AddVideoReview {...props} product={reviewProduct} setShowVideoArea={setShowVideoArea} hidePopup={setshowProductReviewPopup} /> }
      </div>
    </>
  )
}

export default AddProductReviewPopup
