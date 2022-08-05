import types from "./types";
import config from "./../../../../config/index";

export function loadVideos(params) {
    const categorySlug = params.categorySlug || config.DEFAULT_CATEGORY_SLUG;
    const videoSlug = params.videoSlug || '';
    return {
        CALL_API: [
            {
                type: types.FETCH_VIDEOS,
                meta: {
                    path: `/v1/video/list?categorySlug=${categorySlug}&videoSlug=${videoSlug}&limit=${params.limit}&page=${params.page}`,
                    method: "GET",
                    categorySlug
                }
            }
        ]
    }
}

export function loadNavigationPanelVideos(categoryId) {
    return {
        CALL_API: [
            {
                type: types.FETCH_NAVIGATION_PANEL_VIDEOS,
                meta: {
                    path: `/v1/video/getNavList?menuId=${categoryId}`,
                    method: "GET",
                    categoryId
                }
            }
        ]
    }
}

export function likeVideo(videoId) {
    return {
        CALL_API: [
            {
                type: types.LIKE_VIDEO,
                meta: {
                    path: `/v1/video/like?videoId=${videoId}`,
                    method: "GET"
                }
            }
        ]
    }
}


export function dislikeVideo(videoId) {
    return {
        CALL_API: [
            {
                type: types.DISLIKE_VIDEO,
                meta: {
                    path: `/v1/video/dislike?videoId=${videoId}`,
                    method: "GET"
                }
            }
        ]
    }
}


export function flushCategory(){
    return {
        type: types.FLUSH_CATEGORY
    }
}

export function setVideoSlug(ssrVideoData){
    return {
        type: types.SET_VIDEO_SLUG,
        meta: {
            ssrVideoData
        }
    }
}