import { combineReducers } from "redux";
import types from "./types";
import createReducer from "../../utils/createReducer";

const getPendingList = createReducer( [ ] )( {
    [ types.GET_PENDING_LIST ]: ( state, action ) => action.payload,
} );

const getReviewedList = createReducer( [ ] )( {
    [ types.GET_REVIEWED_LIST ]: ( state, action ) => action.payload,
} );

const postReview = createReducer( [ ] )( {
    [ types.POST_REVIEW ]: ( state, action ) => action.payload,
} );

const deleteReview = createReducer( [ ] )( {
    [ types.DELETE_REVIEW ]: ( state, action ) => action.payload,
} );

const generateSignedUrl = createReducer( [ ] )( {
    [ types.GENERATE_SIGNED_URL ]: ( state, action ) => action.payload,
} );

const productReviewId = createReducer( [ ] )( {
    [ types.CHECK_AND_GET_REVIEW_ID ]: ( state, action ) => action.payload,
} );



export default combineReducers( {
    getPendingList,
    getReviewedList,
    postReview,
    deleteReview,
    generateSignedUrl,
    productReviewId
} );
