import React, { useContext, useState, useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { Rate } from 'antd'
import AuthContext from '../../../helpers/authContext'
import { postReview, generateSignedUrl } from '../../../data/ducks/review/actions'
import BackArrowWhite from './../../../../../public/images/back_arrow_white.svg'
import BackArrowBlack from './../../../../../public/images/back_arrow_black.svg'
import CloseArrowWhite from './../../../../../public/images/close.svg'
import CloseArrowBlack from './../../../../../public/images/close_grey.svg'
import { ReactComponent as StarIcon } from './../../../../../public/images/star_24.svg'
import { ReactComponent as OutlinedStarIcon } from './../../../../../public/images/star-outlined.svg'
import Camera from './Camera'

//TODO check if authenticated, show the message if not
const AddVideoReview = (props) => {
  const context = useContext(AuthContext)
  const [submitIsLoading, setSubmitIsLoading] = useState(false)
  const history = props.history
  const [previewVisible, setPreviewVisible] = useState(false)
  const [cameraLoading, setCameraloading] = useState(false)

  const [rate, setRate] = useState(0)

  const handleClickBack = useCallback(() => {
    if(props.setShowVideoArea) return props.setShowVideoArea(false)
    history.goBack()
  }, [history])

  const product = props.location?.state?.product || props.product;
  const productD = product || {};
  if(!productD.id && history) history.push('/my-reviews/pending')
  if(!productD.id) return null

  useEffect(() => {
    props.generateSignedUrl(`${productD.slug}.mp4`, 'review');
  }, [])

  const handleClose = () => {
    props.setShowVideoArea(false)
    props.hidePopup()
  }

  const uploadRecording = (recording, deleteRecording) => {
    if(rate === 0) {
      context.showToastMessage({
        message: `Please add your star rating!`,
        type: `error`
      })
      setPreviewVisible(true)
      return
    }
    setCameraloading(true)
    fetch(props.signedUrl?.result?.url, {
      method: 'PUT',
      headers: {
        ...props.signedUrl?.result?.headers,
        'Content-Type': 'ignore',
        'Access-Control-Allow-Origin': '*'
      },
      body: recording,
    })
    .then((resp) => {
      if (resp.ok) {
        let attachementsUrl = resp.url.split('?')[0]
        const params = {
          text: 'Video Review',
          star: rate,
          productId: productD.id,
          attachments: attachementsUrl,
        }
        props.postReview(params).then((data) => {
          if(!props.mobile.isMobile) {
            props.getPendingList({page:1, limit: 20})
            props.getReviewedList({page:1, limit: 20}) 
            handleClose()
          }
          deleteRecording(false)
          setTimeout(() => {
            context.showToastMessage({
              message: `Rating has been saved successfully!`,
              type: `success`
            })
            history.push(`/my-reviews/reviewed/${productD.slug}`)
          }, 1000)
        }).catch((err) => {
          console.log('couldnt add the review', err)
          context.showToastMessage({
            message: err.message,
            type: `error`
          })
          setPreviewVisible(true)
        })
      }
    })
    .catch(err => {
      console.log('Error: ', err)
      context.showToastMessage({
        message: err.message,
        type: `error`
      })
      setPreviewVisible(true);
    });
  }

  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']

  const containerClass =
    context.theme === 'black'
      ? `luxe-videoslide-container luxe-videoslide-container--black`
      : 'luxe-videoslide-container'

  return (
    <div className="full-height">
      <div className={containerClass}>
        {submitIsLoading && (
          <div className="luxe-videoslide-container__spin-container">
            <Spin size="large" className="spin" />
          </div>
        )}
        <div
          className="product-view-top-container"
          role="button"
          tabIndex="0"
        >
          {context.theme === 'white' ? <BackArrowWhite onClick={handleClickBack} onKeyPress={handleClickBack} /> : <BackArrowBlack onClick={handleClickBack} onKeyPress={handleClickBack} />}
          { props.hidePopup && (context.theme === 'white' ? <CloseArrowWhite className='cancel-icon' onClick={handleClose} onKeyPress={handleClose} /> : <CloseArrowBlack className='cancel-icon' onClick={handleClose} onKeyPress={handleClose} />) }
        </div>
        <div className="luxe-videoslide-container__inner">
          <div className="luxe-add-video-content">
            {previewVisible && (
              <div className="luxe-add-video-productdescription">
                <h1 className="luxe-add-video-productdescription__title">{productD.name}</h1>
                <div className="luxe-add-video-productdescription__rating">
                  <Rate onChange={(value) => setRate(value)} value={rate} tooltips={desc} character={e => e.index < e.value ? <StarIcon /> : <OutlinedStarIcon />} />
                </div>
              </div>
            )}

            <Camera uploadRecording={uploadRecording} isMobile={props.mobile.isMobile} setPreviewVisible={setPreviewVisible} cameraLoading={cameraLoading} />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  signedUrl: state.review.generateSignedUrl
});

const mapDispatchToProps = {
	postReview,
	generateSignedUrl
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVideoReview);
