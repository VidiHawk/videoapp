import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import config from "../../config/index";
import VideoList from "../components/VideoList"
import AuthContext from "../helpers/authContext";
import { loadVideos, likeVideo, dislikeVideo, flushCategory } from "../data/ducks/video/actions";
import Metadata from "../helpers/metadata";

const DEFAULT_LIMIT = 2;

class VideoListContainer extends PureComponent {
	static contextType = AuthContext;
	static fetching( ssr ) {
		const allParams = ssr.path.split('/');
		let categorySlug = allParams && allParams[1] ? allParams[1] : '';
		categorySlug = allParams && allParams[2] ? allParams[2] : categorySlug;
		const videoSlug = allParams?.[3] ? allParams[3] : '';

		return [
			ssr.dispatch(loadVideos({categorySlug, videoSlug, limit:DEFAULT_LIMIT, page:1}))
		];
	}

	constructor(props) {
		super(props);
		this.state = {
			loading:false,
			loadingMore:false,
			parentCategorySlug: '',
			categorySlug: '',
			previousCategorySlug: '',
			nextCategorySlug: '',
			ssrVideoData:{}
		}
	}

	/**
		* These functions will be trigerred when this component is loaded for the first time
		*/
	componentDidMount() {
		this.setFirstVideoSlug(this.props, ()=>{
			const categorySlug = this.getCategorySlug(this.props);
			this.fetchVideoList(this.props, ()=>{
				this.scrollVideoInView(this.props, categorySlug, true);
				setTimeout(()=>{ 
					this.fetchNextCategoryVideos(this.props);
				}, 100);
			})
		});
	}

	/**
		* User page component is visited on client side
		* @param {*} nextProps 
		*/
	componentWillReceiveProps(nextProps){
			if(this.props.match.params.menu !== nextProps.match.params.menu){
				if(this.props.match.params.menu && nextProps.match.params.menu)this.props.flushCategory();
				this.fetchVideoList(nextProps, ()=>{
					this.scrollVideoInView(nextProps, nextProps.match.params.subMenu)
					setTimeout(()=>{ 
						this.fetchNextCategoryVideos(nextProps);
					}, 100);
				});
			}
			else if(this.props.match.params.subMenu !== nextProps.match.params.subMenu){
				window.scrollTo(0,0);
				this.fetchVideoList(nextProps, ()=>{
					this.scrollVideoInView(nextProps, nextProps.match.params.subMenu)
					setTimeout(()=>{ 
						this.fetchNextCategoryVideos(nextProps);
					}, 100);
				});
			}
	}

	componentWillUnmount(){
		this.props.flushCategory();
	}


	setFirstVideoSlug(props, cb){
		this.setState(	{
				ssrVideoData: {
					menu: props.match.params.menu,
					subMenu: props.match.params.subMenu,
					videoSlug: props.match.params.videoSlug
				}
			}, ()=>cb()
			)
	}

	/**
		* This function will scroll video in viewframe (it will be skipped is user is using swipe feature)
		* @param {*} props 
		* @param {*} menuSlug 
		* @returns 
		*/
	scrollVideoInView(props, menuSlug, ssr = false){
		if(props.location.state && props.location.state.isScroll && !ssr) return;
		const listEl = document.getElementById(`list-${menuSlug}`);
		if(listEl){
			setTimeout(() => {listEl.scrollIntoView()}, 100);
		}
		else {
			let timerId = setInterval(() =>{
				if(document.getElementById(`list-${menuSlug}`)){
					document.getElementById(`list-${menuSlug}`).scrollIntoView()
				}
			}, 100);
			setTimeout(() => { clearInterval(timerId);}, 100);
		}
	}

	/**
		* This function will fetch video list
		* @param {*} props 
		* @param {*} cb 
		*/
	fetchVideoList(props, cb){
			const videoSlug = this.state?.ssrVideoData?.videoSlug || '';
			const categorySlug = this.getCategorySlug(props);
			if(!props.video.videos[categorySlug]){
				this.props.loadVideos({categorySlug, videoSlug, limit:DEFAULT_LIMIT, page:1}).then(response=>{
					cb();
				})
			}
			else cb();
	}

	/**
		* This function will get active menu from URL and will store it in state
		* @param {*} props 
		* @returns 
		*/
	getCategorySlug(props){
		let categorySlug = '';
		let parentCategorySlug = '';

		if(props.match.path == '/'){
			categorySlug = config.DEFAULT_CATEGORY_SLUG;
			parentCategorySlug = config.DEFAULT_PARENT_CATEGORY_SLUG;
		}
		else{
			const allParams = props.match.params;
			parentCategorySlug = allParams.menu ? allParams.menu : '';
			categorySlug = allParams.subMenu ? allParams.subMenu : parentCategorySlug;
		}
		this.setState({categorySlug, parentCategorySlug})
		return categorySlug;
	}


	/**
		* This function will load 2 other categories videos, 1- previous category 2- next category
		* @param {*} props 
		*/
	fetchNextCategoryVideos(props){
		if(props.common.menus && props.common.menus.list && props.common.menus.list.length && props.video.videos[this.state.categorySlug] && props.video.videos[this.state.categorySlug].menu){
			const activeVideoMenuData = props.video.videos[this.state.categorySlug].menu;
			const parentMenuData = props.common.menus.list.filter(menu=>menu.id == activeVideoMenuData.parentId);

			if(parentMenuData && parentMenuData[0] && parentMenuData[0].child && parentMenuData[0].child.list){
				let childMenuDataIndex = -1;
				parentMenuData[0].child.list.forEach((menu, index)=>{
					if(menu.id == activeVideoMenuData.id) childMenuDataIndex = index;
				})

				if(parentMenuData[0].child.list[childMenuDataIndex+1]){
					this.setState({
						nextCategorySlug: parentMenuData[0].child.list[childMenuDataIndex+1].slug
					})
					this.fetchLinkedCategoryVideos(parentMenuData[0].child.list[childMenuDataIndex+1].slug);
					
				}

				if(parentMenuData[0].child.list[childMenuDataIndex-1]){
					this.setState({
						previousCategorySlug: parentMenuData[0].child.list[childMenuDataIndex-1].slug
					})
					this.fetchLinkedCategoryVideos(parentMenuData[0].child.list[childMenuDataIndex-1].slug);
				}
			}
		}
	}

	/**
		* This function will fetch videos for previous & next category
		* @param {*} newCategorySlug 
		*/
	fetchLinkedCategoryVideos(newCategorySlug){
		if(!this.props.video.videos[newCategorySlug]){
			this.props.loadVideos({categorySlug: newCategorySlug, limit:DEFAULT_LIMIT, page:1});
		}
	}

	loadMoreVideos(slug, page, cb = null){
		const videoSlug = this.state?.ssrVideoData?.videoSlug || '';

		if(!this.state.loadingMore){
			this.setState({loadingMore: true}, ()=>{
				this.props.loadVideos({categorySlug: slug, videoSlug, limit:DEFAULT_LIMIT, page}).then(res=>{
					if(cb) cb();
					this.setState({loadingMore: false})
				});
			})
		}
	}

	getSeoMetadata(){
		const subMenu = this.props.match.params.subMenu;
		const newMetadata = this.props.video?.videos[subMenu]?.list[0]?.meta;
		return newMetadata;
	}

	render() {
		return (
			<Fragment>
				<Metadata seo={this.getSeoMetadata()}/>
					<div className="full-height overflow-y-hidden">
						<div id="video-cont" className="video-container">
							<VideoList 
								{...this.props} 
								{...this.state}
								limit={DEFAULT_LIMIT} 
								seo={this.getSeoMetadata()}
								loadMoreVideos={this.loadMoreVideos.bind(this)}
							/>
						</div>
					</div>
			</Fragment>
		)
	}

};

const mapStateToProps = (state) => ({
	common: state.common,
	video: state.video
});

const mapDispatchToProps = {
	loadVideos,
	likeVideo,
	dislikeVideo,
	flushCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoListContainer);