import React from 'react'
import StarIcon from './../../../../public/images/star-white.svg'
import { Rate } from 'antd'
import AuthContext from './../../helpers/authContext'
import { NoReview } from './../Common/EmptyPages'

function getFormattedDate(date) {
  let year = date.getFullYear()
  let month = (1 + date.getMonth()).toString().padStart(2, '0')
  let day = date.getDate().toString().padStart(2, '0')

  return month + '/' + day + '/' + year
}


const ProductReview = (props) => {
  const [isVideo, setIsVideo] = React.useState(false)
  const [videoSrc, setVideoSrc] = React.useState(null)
  const { review, product } = props
  const context = React.useContext(AuthContext)
  const { theme } = context

  React.useEffect(() => {
    if (review) {
      const reviewAttachment = review && review.attachments && review.attachments.length ? review.attachments[0] : null
      const video_extensions = ['webm', 'mp4']
      if (reviewAttachment) {
        for (let index = 0; index <= video_extensions.length; index++) {
          if (reviewAttachment.indexOf(video_extensions[index]) !== -1) {
            setVideoSrc(reviewAttachment)
            setIsVideo(true)
            break
          }
        }
      }
    }
  }, [review])

  if (!review) {
    return <NoReview/>
  }

  const reviewBackgroundImage = review && review.attachments && review.attachments.length ? review.attachments[0] : ''

  let classBgImage =
    theme === 'dark'
      ? 'luxe-product-review__background luxe-product-review__background--dark'
      : 'luxe-product-review__background luxe-product-review__background--white'

  classBgImage = reviewBackgroundImage ? classBgImage : classBgImage + ' noimage'
  const reviewdate = review ? getFormattedDate(new Date(review.createTime)) : null

  let classContent =
    theme === 'dark'
      ? 'luxe-product-review-content luxe-product-review-content--dark'
      : 'luxe-product-review-content luxe-product-review-content--white'
  classContent = reviewBackgroundImage ? 'luxe-product-review-content luxe-product-review-content--dark' : classContent

  return (
    <div className={`luxe-product-review`}>
      {!isVideo && <div className={classBgImage} style={{ backgroundImage: `url(${reviewBackgroundImage})` }}></div>}
      <div className={classContent}>
        <div className={`luxe-product-review__title`}>{product.name}</div>
        {review && (
          <div className={`luxe-content luxe-product-review__move-to-bottom`}>
            <h2 className={`luxe-product-review__username`}>
              <span>{review.user ? review.user.firstName + ' ' + review.user.lastName : null}</span>
              <span className={`luxe-product-review__rate`}>
                <Rate value={review.star} character={<StarIcon />} />
              </span>
            </h2>

            <div className="luxe-product-review__date">{reviewdate}</div>
            <div className="luxe-product-review__text">{review.text}</div>
          </div>
        )}
      </div>

      {isVideo && (
        <video
          autoPlay
          loop
          src={videoSrc}
          playsInline="playsinline"
          muted="muted"
          width="100%"
          height="100%"
          style={{ objectFit: 'cover', position: 'relative' }}
        >
          <track
            label="English"
            kind="captions"
            srcLang="en"
            default
          />
          Sorry, your browser doesnt support embedded videos.
        </video>
      )}
    </div>
  )
}

export default ProductReview
