import React, { useEffect, useState, useContext } from 'react'
import { Fragment } from 'react'
import { VideoBG } from './../Common/Preact'
import { Pagination } from './../../helpers/pagination'
import AuthContext from './../../helpers/authContext'
import TrashIcon from './../../../../public/images/trash_icon_2.svg'
import SwipeLayout from './../Videos/SwipeLayout'
import { NoReview } from '../Common/EmptyPages'

import DeleteConfirmationPopup from './DeleteConfirmationPopup'

const MyPostedReviews = (props) => {
	const context = useContext(AuthContext)
	const { limit } = props

	let themeBasedOnSlide = context.theme === 'dark' ? 'dark' : 'white'
	themeBasedOnSlide = props.isSlideHasBackground ? 'dark' : themeBasedOnSlide
	const [videos, setVideos] = useState([])
	const [page, setPage] = useState( props.page || 1)
	let actionParams = {limit, page}

	const paginateMore = props.review?.getReviewedList?.result?.list?.length ? true : false

	useEffect(() => {
		if(props.review?.getReviewedList?.result?.meta?.currentPage){
			setPage(props.review.getReviewedList.result.meta.currentPage)
		}
		if(props.review?.getReviewedList?.result?.list?.length){
			setVideos(props.review.getReviewedList.result.meta.currentPage == 1 ? props.review.getReviewedList.result.list : videos.concat(props.review.getReviewedList.result.list))
		}
	}, [props.review.getReviewedList])

	return (
		<Fragment>
			<Pagination loadMoreAction={props.getReviewedList} actionParams={actionParams} isPaginate={paginateMore} page={page} loaderComponent={<VideoBG />}>
				{ videos && videos.length === 0 ? <NoReview className='my-reviews-container-section' id='reviewed' {...props} /> : <div className='swipe-layout my-reviews-container-section' id='reviewed'>
					<SwipeLayout
						{...props}
						items={videos}
						categorySlug='reviewed'
						parentCategorySlug='my-reviews'
						type='reviewed'
					/>
				</div> }
			</Pagination>
		</Fragment>
	)
}

export const SidebarReview = (props) => {
	const { reviewId, themeBasedOnSlide } = props
	const [showConfirmationPopup, setShowConfirmationPopup] = useState(false)

	const handleDeleteReview = () => {
		props.deleteReview(reviewId).then(res => {
			if (res[0].status.message === 'success') {
				props.getPendingList({page:1, limit: 20})
        props.getReviewedList({page:1, limit: 20}) 
				props.history.push('/my-reviews/reviewed')
				setShowConfirmationPopup(false)
			}
		})
	}

	const sidebarClass =
			themeBasedOnSlide === 'dark'
					? 'luxe-myreview-sidebar-container luxe-myreview-sidebar-container--dark'
					: 'luxe-myreview-sidebar-container luxe-myreview-sidebar-container--white'

	return (
			<div className={sidebarClass}>
					<button className='luxe-myreview-sidebar-btn' onClick={() => setShowConfirmationPopup(true)}>
							<TrashIcon />
					</button>
					<DeleteConfirmationPopup handleDeleteReview={handleDeleteReview} setShowConfirmationPopup={setShowConfirmationPopup} showConfirmationPopup={showConfirmationPopup} />
			</div>
	)
}

export default MyPostedReviews
