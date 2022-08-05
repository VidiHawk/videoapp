import React from 'react'
import { Button, STextArea } from '../../Elements'
import { Rate } from 'antd'
import AuthContext from '../../../helpers/authContext'
import { ReactComponent as StarIcon } from './../../../../../public/images/star_24.svg'
import BackArrowWhite from './../../../../../public/images/back_arrow_white.svg'
import BackArrowBlack from './../../../../../public/images/back_arrow_black.svg'

export const AddReviewPreact = (props) => {
  const context = React.useContext(AuthContext)
  const history = props.history

  const containerClass =
    context.theme === 'black' ? `luxe-textslide-container luxe-textslide-container--black` : 'luxe-textslide-container'

  const handleClickBack = React.useCallback(() => {
    history.goBack()
  }, [history])

  return (
    <div className="full-height">
      <div className={containerClass}>
        <div
          className="product-view-top-container"
          onClick={handleClickBack}
          onKeyPress={handleClickBack}
          role="button"
          tabIndex="0"
        >
          {context.theme === 'white' ? <BackArrowWhite /> : <BackArrowBlack />}
        </div>
        <div className="luxe-textslide-container__inner">
          <div className="luxe-add-textreview-content">
            <form className="luxe-add-textreview-form">
              <h1>
                <div className="anime-bg" style={{ height: '2rem', margin: '0 auto' }}></div>
              </h1>
              <div className="luxe-add-textreview-form__rating">
                <Rate disabled="disabled" character={<StarIcon />} />
              </div>
              <div className="luxe-add-textreview-form__textarea">
                <STextArea
                  rows={5}
                  placeholder="Type here your review"
                  name="review"
                  maxLength={100}
                  showCount
                  disabled="disabled"
                />
              </div>

              <div className="luxe-add-textreview-form__photos">
                <span>Add photos to your review</span>
              </div>
              <div className={`luxe-avatar-uploader `}>
                <div className="anime-bg" style={{ height: '2rem', margin: '0 auto' }}></div>
              </div>
              <Button type="submit" disabled="disabled">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
