import React, {useEffect, useState, useContext} from 'react'
import { ReactComponent as StarIcon } from './../../../../public/images/star.svg'
import { Rate } from 'antd'
import AuthContext from './../../helpers/authContext'
import {getFormattedDate} from '../../helpers/helpers'
import { SidebarReview } from '../MyReviews/MyPostedReviews'

const ProductReview = (props) => {
  const [isVideo, setIsVideo] = useState(false)
  const [videoSrc, setVideoSrc] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const { review, product } = props
  const context = useContext(AuthContext)
  const { theme } = context

  useEffect(() => {
    if (review !== null) {
      const reviewAttachment = review && review.attachments && review.attachments.length ? review.attachments : null
      setImageSrc(reviewAttachment)
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

  const reviewBackgroundImage = review && review.attachments && review.attachments.length ? review.attachments : ''
  const reviewdate = review ? getFormattedDate(new Date(review.createTime)) : null

  let classContent =
    theme === 'dark'
      ? 'luxe-product-review-content luxe-product-review-content--dark'
      : 'luxe-product-review-content luxe-product-review-content--white'
  classContent = reviewBackgroundImage ? 'luxe-product-review-content luxe-product-review-content--dark' : classContent

  const mainDynamicClass = reviewBackgroundImage ? 'overlay' : ''
  return (
    <div className={`luxe-product-review ${mainDynamicClass}`}>
      <div className={classContent}>
        <div className={`luxe-product-review__title`}>{product.name}</div>
        {review && (
          <div className={`luxe-content luxe-product-review__move-to-bottom`}>
            <h2 className={`luxe-product-review__username`}>
              <span>{review.user ? review.user.firstName + ' ' + review.user.lastName : null}</span>
              <span className={`luxe-product-review__rate`}>
                <Rate count={review.star} character={<StarIcon />} />
              </span>
            </h2>

            <div className="luxe-product-review__date">{reviewdate}</div>
            <div className="luxe-product-review__text">{review.text}</div>
            <SidebarReview {...props} themeBasedOnSlide={props.themeBasedOnSlide} reviewId={review.id} />
          </div>
        )}
      </div>

      {isVideo ? (
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
      ) : (<img className={`product-review-image`} src={imageSrc}  />)}
    </div>
  )
}

export default ProductReview
