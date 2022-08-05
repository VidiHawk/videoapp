import React, {useContext, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { Button, STextArea } from '../../Elements'
import AuthContext from '../../../helpers/authContext'
import BackArrowWhite from './../../../../../public/images/back_arrow_white.svg'
import BackArrowBlack from './../../../../../public/images/back_arrow_black.svg'
import CloseArrowWhite from './../../../../../public/images/close.svg'
import CloseArrowBlack from './../../../../../public/images/close_grey.svg'
import { Rate, Upload, Spin } from 'antd'
import StarIcon from './../../../../../public/images/star_24.svg'
import CloseIcon from './../../../../../public/images/close_icon.svg'
import ImageIconPlaceholder from './../../../../../public/images/image_placeholder_icon.svg'
import { postReview, generateSignedUrl } from '../../../data/ducks/review/actions'

//TODO check if authenticated, show the message if not
const AddTextReview = (props) => {
  const context = useContext(AuthContext)
  const history = props.history
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [fileList, setFileList] = useState([])
  const [submitIsLoading, setsubmitIsLoading] = useState(false)
  const [rate, setRate] = useState(0)
  const [textArea, setTextarea] = useState('')

  const handleClickBack = useCallback(() => {
    if(props.setShowTextArea) return props.setShowTextArea(false)
    history.goBack()
  }, [history])

  const product = props.location?.state?.product || props.product
  const productD = product || {}
  if(!productD.id && history) history.push('/my-reviews/pending')
  if(!productD.id) return null

  const handleTextChange = (event) => {
    let target = event.target
    setTextarea(target.value)
  }

  const handleChangeUpload = ({ fileList }) => {
    setFileList(fileList)
  }

  const getSignedUrl = (filename) =>{
    props.generateSignedUrl(filename, 'review')
  }

  const uploadButton = (
    <div>
      <ImageIconPlaceholder />
    </div>
  )

  const onRemoveImage = (e) => {
    e.stopPropagation()
    setFileList([])
    setPreviewVisible(false)
    setPreviewImage(null)
  }

  const handleClose = () => {
    props.setShowTextArea(false)
    props.hidePopup()
  }

  const ratingSaved = () => {
    if(!props.mobile.isMobile) {
      props.getPendingList({page:1, limit: 20})
      props.getReviewedList({page:1, limit: 20})
      handleClose()
    }
    setsubmitIsLoading(false)
    setTimeout(() => {
      context.showToastMessage({
        message: `Rating has been saved successfully!`,
        type: `success`
      })
      history.push(`/my-reviews/reviewed/${productD.slug}`)
    }, 1000)
  }

  const onSubmitReview = async (e) => {
    e.preventDefault()

    if(rate === 0) {
      context.showToastMessage({
        message: `Please add your star rating!`,
        type: `error`
      })
      setPreviewVisible(true)
      return
    }

    const params = {
      text: textArea,
      star: rate,
      productId: productD.id,
    }

    if(fileList.length){
      setsubmitIsLoading(true)
      await fetch(props.signedUrl?.result?.url, {
        method: 'PUT',
        headers: {
          ...props.signedUrl?.result?.headers,
          'Content-Type': 'ignore',
          'Access-Control-Allow-Origin': '*'
        },
        body: fileList[0].originFileObj,
      }).then((resp) => {
        if (resp.ok) {
          let attachementsUrl = resp.url.split('?')[0]
          props.postReview({
            ...params,
            attachments: attachementsUrl,
          }).then((data) => ratingSaved()).catch((error) => {
            setsubmitIsLoading(false)
            console.log('couldnt add the review', error)
          })
        }
      }).catch((err) => {
        setsubmitIsLoading(false)
      })
    } else {
      props.postReview(params).then((data) => ratingSaved()).catch((error) => {
        setsubmitIsLoading(false)
        console.log('couldnt add the review', error)
      })
    }
  }
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']
  
  const containerClass =
    context.theme === 'dark' ? `luxe-textslide-container luxe-textslide-container--dark` : 'luxe-textslide-container'

  return (
    <div className="full-height">
      <div className={containerClass}>
        <div
          className="product-view-top-container"
          role="button"
          tabIndex="0"
        >
          {context.theme === 'white' ? <BackArrowWhite onClick={handleClickBack} onKeyPress={handleClickBack} /> : <BackArrowBlack onClick={handleClickBack} onKeyPress={handleClickBack} />}
          { props.hidePopup && (context.theme === 'white' ? <CloseArrowWhite className='cancel-icon' onClick={handleClose} onKeyPress={handleClose} /> : <CloseArrowBlack className='cancel-icon' onClick={handleClose} onKeyPress={handleClose} />) }
        </div>
        <div className="luxe-textslide-container__inner">
          <div className="luxe-add-textreview-content">
            <form className="luxe-add-textreview-form">
              <h1>{productD && productD.name}</h1>
              <div className="luxe-add-textreview-form__rating">
                <Rate onChange={(value) => setRate(value)} value={rate} tooltips={desc} character={<StarIcon />} />
              </div>
              <div className="luxe-add-textreview-form__textarea">
                <STextArea
                  rows={5}
                  placeholder="Type here your review"
                  name="review"
                  maxLength={100}
                  showCount
                  onChange={handleTextChange}
                />
              </div>

              <div className="luxe-add-textreview-form__photos">
                <span>Add photos to your review</span>
              </div>
              <Upload
                name="reviewimage"
                accept="image/*"
                listType="picture-card"
                className={`luxe-avatar-uploader ${previewVisible ? 'luxe-avatar-uploader--selected' : ''}`}
                showUploadList={false}
                beforeUpload={(file) => {
                  setFileList((fileList) => [...fileList, file.filelist])
                  getSignedUrl(file.name)
                  let src = URL.createObjectURL(file)
                  setPreviewImage(src)
                  setPreviewVisible(true)
                  return
                }}
                onChange={handleChangeUpload}
                onRemove={onRemoveImage}
              >
                {previewVisible ? (
                  <>
                    <CloseIcon className="luxe-avatar-uploader__close" onClick={onRemoveImage} />
                    <img src={previewImage} alt="avatar" style={{ width: '100%', height: '100%' }} />{' '}
                  </>
                ) : (
                  uploadButton
                )}
              </Upload>
              <Button onClick={onSubmitReview} disabled={submitIsLoading ? true : false} type="submit">
                { submitIsLoading ? 'Submitting' : 'Submit' }
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  signedUrl: state.review.generateSignedUrl
})

const mapDispatchToProps = {
	postReview,
	generateSignedUrl
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTextReview)