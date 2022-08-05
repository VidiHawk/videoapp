import React from 'react'
import handleViewport from '../Elements/HandleViewPort'
import Video from './Video'

/**
 * VideoSlide
 * Contains: Video, Sidebar, ProductInfo, EMailSlide
 *
 */
export const VideoSlide = (props) => {
   //console.log('🚀 ~ file: index.js ~ line 12 ~ VideoSlide ~ props', props)
  const {
    forwardedRef,
    navigationPanel,
    product,
    type,
    video,
    preventSlideScroll,
    slideId,
    pending,
    bagOpenFor,
    commentOpenFor,
    hideCommentSection,
    hideBagSection
  } = props

  return (
    <div ref={forwardedRef} className="full-height">
      <ViewportBlock
        type={type}
        video={video}
        slideId={slideId}
        emailId={null}
        product={product}
        disconnectOnLeave={false}
        navigationPanel={navigationPanel}
        preventSlideScroll={preventSlideScroll}
        pending={pending}
        onLeaveViewport={() => {hideCommentSection(); hideBagSection()}}
        bagOpenFor={bagOpenFor}
        commentOpenFor={commentOpenFor}
      />
    </div>
  )
}

const ViewportBlock = handleViewport(Video, { rootMargin: '0px', threshold: [0.25, 0.85] })
