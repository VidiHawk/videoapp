import { combineReducers } from "redux";
import types from "./types";
import createReducer from "../../utils/createReducer";

const videos = createReducer( [ ] )( {
    [ types.FETCH_VIDEOS ]: ( state, action ) => {
        const newResult =  action.payload.result;
        
        if(state[action.meta.categorySlug]?.meta?.currentPage){

            if(newResult?.meta?.currentPage && state[action.meta.categorySlug].meta.currentPage < newResult.meta.currentPage){
                return {
                    ...state,
                    [action.meta.categorySlug]: {
                        ...newResult,
                        list: [...state[action.meta.categorySlug].list, ...newResult.list]
                    }
                }
            }
        }
        else{
            return {
                ...state,
                [action.meta.categorySlug]: newResult
            }
        }
    },
    [ types.FLUSH_CATEGORY ]: ( state, action ) => [],
} );

const navigationPanelVideos = createReducer( [ ] )( {
    [ types.FETCH_NAVIGATION_PANEL_VIDEOS ]: ( state, action ) => {
        return {
            ...state,
            [action.meta.categoryId]: action.payload.result
        }
    },
} );

const likeVideo = createReducer( [ ] )( {
    [ types.LIKE_VIDEO ]: ( state, action ) => action.payload,
} );

const dislikeVideo = createReducer( [ ] )( {
    [ types.DISLIKE_VIDEO ]: ( state, action ) => action.payload,
} );

const ssrVideoSlug = createReducer( [ ] )( {
    [ types.SET_VIDEO_SLUG ]: ( state, action ) => {
        return action.meta.videoSlug;
    },
} );




export default combineReducers( {
    videos,
    navigationPanelVideos,
    likeVideo,
    dislikeVideo,
    ssrVideoSlug
} );
