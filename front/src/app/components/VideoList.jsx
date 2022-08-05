import React, { Fragment, useContext, useEffect, useState, memo, useCallback } from 'react'
import { VideoBG } from './Common/Preact'
import SwipeLayout from './Videos/SwipeLayout'
import AuthContext from './../helpers/authContext'
import { getChildCategoriesList, getParentCategory, mergeTwoArrays } from './../helpers/helpers'

const VideoList = memo(function VideoList(props) {
	const context = useContext(AuthContext);
	const [menuList, setMenuList] = useState([]);

	useEffect(()=>{
		const menu = getParentCategory(props.location.pathname);
		const menuChildrenArr = getChildCategoriesList(props.common.menus.list, menu);
		setMenuList(menuChildrenArr);
	}, [props.match.params.menu])

	if(props.video.videos && Object.keys(props.video.videos).length){
		return(
			<Fragment>
				{
					menuList.map((menu, index)=> {
						return(
							<div key={index} className="list-view" id={`list-${menu.slug}`}>
								{
									props.video.videos[menu.slug] && props.video.videos[menu.slug].list && props.video.videos[menu.slug].list.length ?
										<VideoListContent {...props} videosList={props.video.videos[menu.slug]} categorySlug={menu.slug}/>
										:<VideoBG/>
									}
							</div>
						)
					})
				}
			</Fragment>
		)
	}
	else return null;
})

const VideoListContent = memo(function VideoListContent(props) {
	const { categorySlug, parentCategorySlug, videosList } = props;
	const [videos, setVideos] = useState([]);
	const context = useContext(AuthContext);
	const { defaultVideoId, setDefaultVideoId } = context

	useEffect(()=>{
		if (videosList && videosList.list && videosList.list.length) {
			setVideos(videosList.list)
			if (defaultVideoId === 0) {
				setDefaultVideoId(videosList.list[0].id)
			}
		}
	}, [videosList])

	const loadMore = (catSlug) =>{
		if(categorySlug == catSlug){
			if (videosList.meta.pages > videosList.meta.currentPage) {
				props.loadMoreVideos(catSlug, videosList.meta.currentPage+1, ()=>{
				})
			}
		}
	}

	if(videosList && videosList.list){
		return (
			<SwipeLayout
					{...props}
					items={videos}
					categorySlug={categorySlug}
					parentCategorySlug={parentCategorySlug}
					loadMore={loadMore}
			/>
		)
	}
	else return null;
})


export default VideoList;
