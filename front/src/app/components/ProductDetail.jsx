import React, { PureComponent, Fragment, Component, useEffect, useState, useContext, memo } from 'react';
import Loader from "./Common/Loader"
import ErrorBoundary from "./../helpers/ErrorBoundry";
import BottomMenu from "./ProductDetail/BottomMenu";
import Reviews from './ProductDetail/Reviews'
import BackArrow from './../../../public/images/back_arrow_black.svg'
import AuthContext from './../helpers/authContext';
import FSCIcon from './../../../public/images/fsc.svg'
import RecycleIcon from './../../../public/images/recyclable.svg'
import CrueltyIcon from './../../../public/images/cruelty.svg';
import { VideoSlide } from './Videos/VideoSlide';
import VideoSideMenu from './Videos/VideoSideMenu';
import VideoComment from './Videos/VideoComment';
import VideoNavigation from './Videos/VideoNavigation'
import handleViewport from './Elements/HandleViewPort';
import ProductInfo from './Product/Info';
import { getCategoryFromID } from './../helpers/helpers';

const ProductDetail = memo((props)=> {
	if(props.product?.productMenus?.length > 0 && props?.product?.detail){
		const context = useContext(AuthContext);
		const [backUrl, setBackUrl] = useState('/skincare/shop-all');
		const [currentActive, setCurrentActive] = useState(props.match.params.subMenu);
		const [commentOpenFor, setCommentOpenFor] = useState(0);
  const [bagOpenFor, setBagOpenFor] = useState(0);
		const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
		const [toggleView, setToggleView] = useState(true);

		useEffect(()=>{
			const allParams = props.match.params;
			const subMenu = allParams.subMenu;
			const menuElement = document.getElementById(`list-${subMenu}`);
			menuElement.scrollIntoView();
			checkForNavigation(subMenu);
			checkAndSetBackURL();
		}, [props.match.params, props.product?.productEntities])

		const checkAndSetBackURL = ()=>{
			const productDetail = props.product.detail;
			if(productDetail && productDetail.parentCategoryId){
				const categoryMenu = getCategoryFromID(props.common.menus.list, productDetail.parentCategoryId);
				if(categoryMenu && categoryMenu.child && categoryMenu.child.list){
					const categorySlug = categoryMenu.slug;
					const childMenu = categoryMenu.child.list.filter(menu=>menu.id == productDetail.categoryId);
					const subCategorySlug = childMenu?.[0]?.slug ? childMenu[0].slug : '';
					if(categorySlug && subCategorySlug && productDetail.videoSlug){
						const videoDetailURL = `/${categorySlug}/${subCategorySlug}/${productDetail.videoSlug}`;
						setBackUrl(videoDetailURL);
					}
				}
			}
		}

		const goBack = () =>{
			props.history.push(backUrl);
		}

		useEffect(()=>{
			if(commentOpenFor) setToggleView(false);
			else setToggleView(true);
	}, [commentOpenFor])
		
		const checkForNavigation = (subMenu) =>{
			const currentMenuIndex = props.product.productMenus.findIndex(x => x.slug ===subMenu);
			const allMenuCount = props.product.productMenus.length;
			setRight(currentMenuIndex < allMenuCount - 1);
			setLeft(!!currentMenuIndex);
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

		const videoAreaInViewPort = (catSlug) =>{
			props.history.push({
					pathname:`/product/${props.match.params.slug}/${catSlug}`
			})
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

		return (
			<Fragment>
				<div className={`video-container ${currentActive === 'product-specifications' ? 'text-page-view' : ''}`}>
					{
						props.product.productMenus.map((menu, index)=>{
							if(menu.slug !== 'reviews'){
								return(
									<div className="list-view" key={index} data-id={`${menu.slug}`} id={`list-${menu.slug}`}>
										<BackArrow onClick={()=>goBack()} className="top-back-arrow"/>
										{
											props.product?.productEntities?.[menu.slug]?.length > 0 && 
											<div className={`swipe-layout`}>
												{
													props.product.productEntities[menu.slug].map((product, key)=>{
														const hasTop = false;
														const hasBottom = false;
														const products = props.product?.detail?  props.product.detail : [];
													
														return(
															product.type == 'video' ?
															<div key={key} className="video-area" id={`${menu.slug}_video_${product.entity.video.id}`}>
																	<VideoSlideBlock
																			video={product.entity.video}
																			commentOpenFor={commentOpenFor}
																			bagOpenFor={bagOpenFor}
																			hideCommentSection={hideCommentSection}
																			hideBagSection={hideBagSection}
																			preventSlideScroll={(state) => preventSlideScroll(state)}
																			onEnterViewport={() => {
																				videoAreaInViewPort(menu.slug)
																		}}
																	/>
																<ProductInfo product={products} parentCategorySlug='product' categorySlug={menu.slug} toggleView={toggleView} isProductDetailView={true}/>

																{!context.navigationPanel && <VideoSideMenu {...props} video={product.entity.video} setCommentOpenFor={setCommentOpenFor} 
																commentOpenFor={commentOpenFor} videoId={product.entity.video.id} product={products} parentCategorySlug="product"
																	categorySlug={menu.slug} left={left} right={right} top={hasTop} bottom={hasBottom}
																	bagOpenFor={bagOpenFor} setBagOpenFor={setBagOpenFor}/>}

																{commentOpenFor === product.entity.video.id && <VideoComment {...props} videoId={product.entity.video.id}/>}
																<VideoNavigation upArrowClicked={scrollUp} downArrowClicked={scrollBottom} leftArrowClicked={scrollLeft} 
																	rightArrowClicked={scrollRight} left={left} right={right} top={hasTop} bottom={hasBottom}/>
															</div>
															:
															product.type == 'page' ? 
															<PageBlock 
																data={product} 
																product={products}
																areaInViewPort={videoAreaInViewPort}
																menuSlug={menu.slug}
																/> 
															: null
														)
												})
											}
										</div>
										}
									</div>
								)
							}
							else{
								return(
									props.product?.productReviews?.list?.length > 0 && 
									<div className="list-view" data-id="reviews" id="list-reviews" key={index}>
										<BackArrow onClick={()=>goBack()} className="top-back-arrow"/>
										<ReviewsBlock
											{...props}
											items={props.product.productReviews.list}
											categorySlug={'reviews'}
											parentCategorySlug={'product'}
											areaInViewPort={videoAreaInViewPort}
										/>
									</div>
								)
							}
						})
					}
				</div>
				<BottomMenu {...props} currentActive={currentActive} setCurrentActive={setCurrentActive}/>
			</Fragment>
		)
	}
	else return null;
})


const Page = memo((props) =>{
	const context = useContext(AuthContext);
	const { theme } = context;
	const { data, product, menuSlug, areaInViewPort } = props;

	useEffect(()=>{
		initiateObserver();
	}, [])

	const initiateObserver = () => {
		const el = document.getElementById(menuSlug);
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.intersectionRatio > 0.85) {
					setTimeout(() => {
					const catSlug = entry.target.id;
					areaInViewPort(catSlug)
					}, 100)
				}
			});
		}, {
			rootMargin: '0px',
			threshold: [0.25, 0.85]
		});
		observer.observe(el);
	}

	if(data?.entity?.page?.name){
		return(
			<div id={`${menuSlug}`} className={`product-details-container static-bg  p-ingredients product-details-container-${theme}`}>
				<div className="product-details-subcontainer">
					<ProductInfo product={product} theme={theme === 'black' ? 'white' : 'black'} />
					<div className="ingredients-container">
						<div className="ingredients-title">{data.entity.page.name}</div>
						<div className="ingredients-text" dangerouslySetInnerHTML={{ __html:data.entity.page.content }}/>
				</div>
				<div className="product-feature-container">
						<div className="product-feature-subcontainer">
								<div className="feature-item-container">
										<FSCIcon />
										<div className="feature-description">Packaging paper made from FSC approved sustainable forests</div>
								</div>
								<div className="feature-item-container">
										<RecycleIcon />
										<div className="feature-description">100% recyclable</div>
								</div>
								<div className="feature-item-container">
										<CrueltyIcon />
										<div className="feature-description">Cruelty free</div>
								</div>
						</div>
					</div>
			</div>
		</div>
		)
	}
	else return null;
})

const VideoSlideBlock = handleViewport(VideoSlide, { rootMargin: '0px', threshold: [0.25, 1] })
const ReviewsBlock = handleViewport(Reviews, { rootMargin: '0px', threshold: [0.25, 1] })
const PageBlock = handleViewport(Page, { rootMargin: '0px', threshold: [0.25, 1] })

export default ProductDetail;
