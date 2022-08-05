import { combineReducers } from "redux";
import types from "./types";
import createReducer from "../../utils/createReducer";

const getList = createReducer( [ ] )( {
    [ types.GET_LIST ]: ( state, action ) => action.payload,
} );

const postComment = createReducer( [ ] )( {
    [ types.POST_COMMENT ]: ( state, action ) => action.payload,
} );

const likeComment = createReducer( [ ] )( {
    [ types.LIKE_COMMENT ]: ( state, action ) => action.payload,
} );

const dislikeComment = createReducer( [ ] )( {
    [ types.DISLIKE_COMMENT ]: ( state, action ) => action.payload,
} );

const deleteComment = createReducer( [ ] )( {
    [ types.DELETE_COMMENT ]: ( state, action ) => action.payload,
} );


export default combineReducers( {
    getList,
    postComment,
    likeComment,
    dislikeComment,
    deleteComment
} );
