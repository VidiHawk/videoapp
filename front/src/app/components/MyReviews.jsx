import React, { useContext, useEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'
import AuthContext from './../helpers/authContext'
import { NoLoginReview, NoProductsFound } from './Common/EmptyPages'
import AddProductreviewPopup from './MyReviews/AddProductReviewPopup'
import MyPostedReviews from './MyReviews/MyPostedReviews'
import PendingReviews from './MyReviews/PendingReviews'
import { likeVideo, dislikeVideo } from '../data/ducks/video/actions'
import { deleteReview } from '../data/ducks/review/actions'
const DEFAULT_LIMIT = 20

const MyReviews = React.memo((props) => {
  const context = useContext(AuthContext)
	const theme = context.theme === 'black' ? 'black' : 'white'
	const [activeId, setActiveId] = useState('')

  const [showProductReviewPopup, setshowProductReviewPopup] = useState(false)
	const [reviewProduct, setReviewProduct] = useState('')

  useEffect(() => {
    if (context.authenticated) {
      props.getPendingList({page:1, limit:DEFAULT_LIMIT})
      props.getReviewedList({page:1, limit:DEFAULT_LIMIT})
    }
  }, [context.authenticated])

	useEffect(() => {
		initiateObserver()
	}, [])

	useEffect(() => {
		const subMenu = props.match.params && props.match.params.subMenu ? props.match.params.subMenu : 'pending'
		setActiveId(subMenu)
	}, [props.match.params])

	useEffect(() => {
		if(activeId){
			const submenuToScroll = document.getElementById(activeId)
			if (submenuToScroll) {
				setTimeout(() => {
					submenuToScroll.scrollIntoView()
				}, 100)
			}
			// props.history.push(`/my-reviews/${activeId}`)
		}
	}, [activeId])

	const initiateObserver = () => {
		const children = document.querySelectorAll('.my-reviews-container-section')
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.intersectionRatio > 0.50) {
					setTimeout(() => {
					const allParams = entry.target.id
					 allParams && setActiveId(allParams)
					}, 100)
				}
			})
		}, {
			rootMargin: '0px',
			threshold: [0.25, 0.85]
		})
		children.forEach( child => {
			observer.observe(child)
		})
	}

	const renderBlock = useMemo(() => {
		return (<div className={`my-reviews-container video-container`}>
			<PendingReviews {...props} setshowProductReviewPopup={setshowProductReviewPopup} setReviewProduct={setReviewProduct}/>
			<MyPostedReviews {...props}/>
		</div>)

	})

	if(!context.authenticated) return <div className='my-reviews-container'>
		<NoLoginReview className='my-reviews-container-section' id='pending' {...props} />
		<NoLoginReview className='my-reviews-container-section' id='reviewed' {...props} />
	</div>

  const wrapperClass = showProductReviewPopup ?'luxe-myreviews-component-wrapper luxe-myreviews-component-wrapper--overlay' : 'luxe-myreviews-component-wrapper'

  //if the slide has background(image or video) set theme to black, if none then inherit from the main theme in the context
  return (
			<div className="full-height">
				<div className={wrapperClass}>
					{ props.review?.getPendingList?.result?.list?.length || props.review?.getReviewedList?.result?.list?.length ? (
						<>
							{renderBlock}
							<AddProductreviewPopup
									{...props}
									showProductReviewPopup={showProductReviewPopup}
									setshowProductReviewPopup={setshowProductReviewPopup}
									reviewProduct = {reviewProduct}
							/>
						</>
					) : <NoProductsFound {...props} theme={theme} />}
				</div>
			</div>
  )
})

const mapStateToProps = state => ({})

const mapDispatchToProps = {
	likeVideo,
	dislikeVideo,
	deleteReview
}

export default connect(mapStateToProps, mapDispatchToProps)(MyReviews)
