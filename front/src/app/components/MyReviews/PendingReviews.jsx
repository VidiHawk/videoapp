import React, { useEffect, useState, useContext } from 'react'
import { Fragment } from 'react'
import { VideoBG } from './../Common/Preact'
import { Pagination } from './../../helpers/pagination'
import SwipeLayout from './../Videos/SwipeLayout'
import AuthContext from './../../helpers/authContext'
import { NoProductsFound } from '../Common/EmptyPages'

const MyReviewsList = (props) =>{
	const context = useContext(AuthContext)
	const {limit, loadReviews} = props

	let themeBasedOnSlide = context.theme === 'black' ? 'black' : 'white'
  themeBasedOnSlide = props.isSlideHasBackground ? 'black' : themeBasedOnSlide
 	const [videos, setVideos] = useState([])
	const [page, setPage] = useState( props.page || 1)
	let actionParams = {limit, page}

	const paginateMore = props.review?.getPendingList?.result?.list?.length ? true : false

	useEffect(() => {
		if(props.review?.getPendingList?.result?.meta?.currentPage){
			setPage(props.review.getPendingList.result.meta.currentPage)
		}
		if(props.review?.getPendingList?.result?.list?.length){
			setVideos(props.review.getPendingList.result.meta.currentPage == 1 ? props.review.getPendingList.result.list : videos.concat(prope.review.getPendingList.result.list))
		}
	}, [props.review.getPendingList])

	return (
		<Fragment>
			{ props.review.getPendingList.result?.list?.length === 0 ? <NoProductsFound className={`my-reviews-container-section`} id='pending' vlength={videos} history={props.history} /> : <div className={`my-reviews-container-section`} id='pending'>
				<Pagination loadMoreAction={props.getPendingList} actionParams={actionParams} isPaginate={paginateMore} page={page} loaderComponent={<VideoBG />}>
					<SwipeLayout
						{...props}
							items={videos}
							categorySlug='pending'
							parentCategorySlug='my-reviews'
							type='pending'
							setshowProductReviewPopup={props.setshowProductReviewPopup}
							setReviewProduct={props.setReviewProduct}
					/>
				</Pagination>
			</div> }
		</Fragment>
	)
}

export default MyReviewsList
