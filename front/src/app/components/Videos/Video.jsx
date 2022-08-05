import React, { Fragment, useContext } from 'react'
import config from '../../../config'
import AuthContext from './../../helpers/authContext'
import loadable from '@loadable/component'

const HLSPlayer = loadable(() => import('./HLSPlayer'), {
  ssr: false,
})

const Video = (props) =>{
  const context = useContext(AuthContext);
  const {
    forwardedRef,
    inViewport,
    type,
    inBetween,
    isLeftViewPort,
    preventSlideScroll,
    bagOpenFor,
    commentOpenFor
  } = props
  let { video } = props

  let imageUrl = video.thumbnail && video.thumbnail.indexOf('http') === 0 ? video.thumbnail : config.IMG_END_POINT+'/'+video.thumbnail;
  if(type) imageUrl = video.review ? video.review.attachments : ''
  const isNavigationPanelOpen = context.navigationPanel
  const { defaultVideoId } = context
  if(type === 'reviewed') video.hls_public_url = video.review?.attachments?.indexOf('mp4') > 0 ? video.review.attachments : null

  return(
    <Fragment>
      <div ref={forwardedRef} className="full-height">
      {video.hls_public_url? (
        <HLSPlayer
          video={video}
          inViewport={inViewport}
          navigationPanel={isNavigationPanelOpen}
          inBetween={inBetween}
          videoId={video.id}
          isLeftViewPort={isLeftViewPort}
          preventSlideScroll={preventSlideScroll}
          isDefaultVideo={defaultVideoId === video.id}
          bagOpenFor={bagOpenFor}
          commentOpenFor={commentOpenFor}
        />
      ) : imageUrl && 
        <div className="missing-video-image-container">
          <img src={imageUrl} style={{ height:'100%' }} alt="Missing Video"/>
        </div>
      }
      </div>
    </Fragment>
  )
}

export default Video;
