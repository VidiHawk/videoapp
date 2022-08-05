import React, { useContext, useEffect, useState } from 'react'
import AuthContext from './../../helpers/authContext'
import { getChildCategoriesList } from './../../helpers/helpers';
import VideoNavigation from './../Videos/VideoNavigation';
import ProductReview from './../Product/ProductReview';
import VideoSideMenu from './../Videos/VideoSideMenu';
import { productDetailSubMenus } from './../../../@constants';
import { Fragment } from 'react';
/**
 * Swipe Layout
 * @param props
 */
const Reviews = React.memo(function Reviews(props) {
  const context = useContext(AuthContext);
  const { categorySlug, parentCategorySlug, areaInViewPort } = props;
  const [activeCategory, setActiveCategory] = useState('');
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(true);
  const [bagOpenFor, setBagOpenFor] = useState(0);
  const [commentOpenFor, setCommentOpenFor] = useState(0);

  useEffect(()=>{
		initiateObserver();
	}, [])

	const initiateObserver = () => {
		const el = document.getElementById(categorySlug);
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.intersectionRatio > 0.85) {
					setTimeout(() => {
					const catSlug = entry.target.id;
          //areaInViewPort(catSlug)
					}, 100)
				}
			});
		}, {
			rootMargin: '0px',
			threshold: [0.25, 0.85]
		});
		observer.observe(el);
	}

  const hasTopVideos = (index, allItems) =>{
    return index ? true : false
  }

  const hasBottomVideos = (index, allItems) =>{
    return index < allItems.length-1 ? true : false
  }

  const scrollUp = () => {
    const element = document.querySelector(`.swipe-layout.${categorySlug}`);
    if (element) {
      element.scrollTop -= element.offsetHeight;
    }
  }

  const scrollBottom = () => {
    const element = document.querySelector(`.swipe-layout.${categorySlug}`);
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

 if(props.items && props.items.length){ 
  return(
   <div className={`swipe-layout ${categorySlug}`}>
    {
     props.items.map((video, key)=>{
      const singleProduct = video && video.product && video.product[0] ? video.product[0] : {};
      const hasTop = hasTopVideos(key, props.items);
      const hasBottom = hasBottomVideos(key, props.items);
      return(
        <div key={key} className="video-area" id={`${categorySlug}`} data-index={key} data-cat={categorySlug} data-videoid={video.id}>
          <ProductReview review={video.review} product={video.product}/>

          {!context.navigationPanel && <VideoSideMenu {...props} isReview={true} product={singleProduct} parentCategorySlug={parentCategorySlug} categorySlug={categorySlug} left={left} right={right} top={hasTop} bottom={hasBottom} bagOpenFor={bagOpenFor} setBagOpenFor={setBagOpenFor} setCommentOpenFor={setCommentOpenFor} commentOpenFor={commentOpenFor}/>}

          <VideoNavigation upArrowClicked={scrollUp} downArrowClicked={scrollBottom} leftArrowClicked={scrollLeft} rightArrowClicked={scrollRight} left={left} right={right} top={hasTop} bottom={hasBottom}/>
        </div>
      )
    })
   }
   </div>
  )
 }
 else return null;
})


export default Reviews;
