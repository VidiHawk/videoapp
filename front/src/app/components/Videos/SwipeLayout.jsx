import React, { memo, useContext, useEffect, useState } from 'react'
import AuthContext from './../../helpers/authContext'
import VideoSideMenu from './VideoSideMenu'
import VideoComment from './VideoComment'
import { VideoSlide } from './VideoSlide'
import ProductInfo from '../Product/Info'
import { getChildCategoriesList } from '../../helpers/helpers'
import VideoNavigation from './VideoNavigation'
import { CategogryVideoBG } from '../Common/Preact'
import handleViewport from './../Elements/HandleViewPort'
import detectMobile from './../../helpers/detectmobile'

const isiOS = detectMobile.iOS();

/**
 * Swipe Layout file
 * @param props
 */
const SwipeLayout = memo(function SwipeLayout(props) {
  const context = useContext(AuthContext);
  const { categorySlug, parentCategorySlug, type, isProduct, isReview, loadMore } = props;
  const [activeCategory, setActiveCategory] = useState(categorySlug);
  const [defaultVideoId, setDefaultVideoId] = useState(null);
  const [commentOpenFor, setCommentOpenFor] = useState(0);
  const [bagOpenFor, setBagOpenFor] = useState(0);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [toggleView, setToggleView] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initiateObserver();
  }, [props.items])

  useEffect(()=>{
    if(activeCategory && !isProduct && !isReview){
      const allChildMenus = getChildCategoriesList(props.common.menus.list, parentCategorySlug);
      const currentMenuIndex = allChildMenus.findIndex(x => x.slug ===activeCategory);
      const allMenuCount = allChildMenus.length;

      setRight(currentMenuIndex < allMenuCount - 1);
      setLeft(!!currentMenuIndex);
    }
  }, [activeCategory, parentCategorySlug])

  useEffect(()=>{
    if(commentOpenFor) setToggleView(false);
    else setToggleView(true);
  }, [commentOpenFor])


  const initiateObserver = () =>{
    const children = document.querySelectorAll(".video-area");
    const observer = new IntersectionObserver( (entries, observer) => {
      entries.forEach (entry => {
        if (entry.intersectionRatio > 0.50) {
          const dataParams = entry.target.dataset;
          const allQueryParams = props.match.params;
          if(allQueryParams.subMenu !== dataParams.cat || allQueryParams.videoSlug !== dataParams.slug){
            if(parentCategorySlug && dataParams.cat && dataParams.slug){
              setActiveCategory(dataParams.cat);
              props.history.push({
                pathname:`/${parentCategorySlug}/${dataParams.cat}/${dataParams.slug}`
              })
              if (dataParams.cat === categorySlug && props.items.length === Number(dataParams.key) + 1) {
                loadMore(dataParams.cat);
              }
            }
          }
        } 
      });
    }, {
      rootMargin: '0px',
      threshold: [0.25, 0.75]
  });
    children.forEach( child => {
      observer.observe(child);
    });
  }

  const hasTopVideos = (index, allItems) =>{
    return !!index
  }

  const hasBottomVideos = (index, allItems) =>{
    return index < allItems.length - 1
  }

  const scrollUp = () => {
    const element = document.querySelector(`.swipe-layout.${activeCategory}`);
    if (element) {
      element.scrollTop -= element.offsetHeight;
    }
  }

  const scrollBottom = () => {
    const element = document.querySelector(`.swipe-layout.${activeCategory}`);
    if (element) {
      element.scrollTop += element.offsetHeight;
    }
  }

  const scrollLeft = () => {
    const element = document.querySelector(".video-container");
    if (element) {
      element.scrollLeft -= element.offsetWidth;
    }
  }

  const scrollRight = () => {
    const element = document.querySelector(".video-container");
    if (element) {
      element.scrollLeft += element.offsetWidth;
    }
  }

  
  const hideCommentSection = () => {
    if (commentOpenFor !== 0) {
      setCommentOpenFor(0);
      context.resumeSubTitles();
    }
  }

  const hideBagSection = () => {
    setBagOpenFor(0);
  }

  const preventSlideScroll = (state) => {
    const element = document.querySelector(".video-container");
    if (state === 'enter') {
      //if mouse/hand in control area, prevent horizontal scroll
      if (element) {
        element.style.overflowX = 'hidden';
      }
    } else {
      if (element) {
        element.style.overflowX = 'scroll';
      }
    }
  }

 if(props.items && props.items.length){
  if(!defaultVideoId && props.items[0].id){
    setDefaultVideoId(props.items[0].id)
  }

  const totalVideos = props.video?.videos[categorySlug].meta.total;
  const alreadyRenderedVideos = props.items.length;

  return(
   <div className={`swipe-layout ${categorySlug}`}>
    {
     props.items.map((video, key)=>{
      const singleProduct = video && video.product && video.product[0] ? video.product[0] : {};
      const hasTop = hasTopVideos(key, props.items);
      const hasBottom = hasBottomVideos(key, props.items);

      return(
       <div key={key} className="video-area" id={`${categorySlug}_video_${video.id}`} data-index={key} data-cat={categorySlug} data-videoid={video.id} data-slug={video.meta?.slug }  data-key={key}
        >
           <VideoSlide
             video={video}
             type={type}
             commentOpenFor={commentOpenFor}
             bagOpenFor={bagOpenFor}
             hideCommentSection={hideCommentSection}
             hideBagSection={hideBagSection}
             preventSlideScroll={(state) => preventSlideScroll(state)}
           />
        <ProductInfo {...props} product={singleProduct} review={video.review} parentCategorySlug={parentCategorySlug} categorySlug={categorySlug} type={type} setshowProductReviewPopup={props.setshowProductReviewPopup} setReviewProduct={props.setReviewProduct} toggleView={toggleView} isVideo={video.hls_public_url || video.review?.attachments?.indexOf('mp4') > 0 ? true : false || false} />

        {!context.navigationPanel && <VideoSideMenu {...props} video={video} setCommentOpenFor={setCommentOpenFor} 
        commentOpenFor={commentOpenFor} videoId={video.id} product={singleProduct} parentCategorySlug={parentCategorySlug}
         categorySlug={categorySlug} left={left} right={right} top={hasTop} bottom={hasBottom}
         bagOpenFor={bagOpenFor} setBagOpenFor={setBagOpenFor} />}

        {commentOpenFor === video.id && <VideoComment {...props} videoId={video.id}/>}
        <VideoNavigation upArrowClicked={scrollUp} downArrowClicked={scrollBottom} leftArrowClicked={scrollLeft} 
         rightArrowClicked={scrollRight} left={left} right={right} top={hasTop} bottom={hasBottom}/>
       </div>
      )
    })
   }
   { totalVideos > alreadyRenderedVideos && <CategogryVideoBG/> }
   </div>
  )
 }
 else return null;
})

// const VideoSlideBlock = handleViewport(VideoSlide, { rootMargin: '0px', threshold: [0.25, 1] })


export default SwipeLayout;
