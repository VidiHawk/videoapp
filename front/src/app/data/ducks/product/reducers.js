import { combineReducers } from "redux";
import types from "./types";
import createReducer from "../../utils/createReducer";

const detail = createReducer( [ ] )( {
    [ types.FETCH_DETAIL ]: ( state, action ) => action.payload.result,
    [ types.FLUSH_PRODUCT ]: ( state, action ) => []
} );

const fullDetail = createReducer( [ ] )( {
    [ types.FETCH_FULL_DETAIL ]: ( state, action ) => action.payload.result,
} );

const productReviews = createReducer( [ ] )( {
    [ types.FETCH_REVIEWS ]: ( state, action ) => action.payload.result,
} );

const productMenus = createReducer( [ ] )( {
    [ types.FETCH_PRODUCT_MENUS ]: ( state, action ) => action.payload.list,
} );

const productEntities = createReducer( [ ] )( {
    [ types.FETCH_PRODUCT_ENTITIES ]: ( state, action ) => {
        return {
            ...state,
            [action.meta.entitySlug]: action.payload.list
        }
    }
} );



export default combineReducers( {
    detail,
    fullDetail,
    productReviews,
    productMenus,
    productEntities
} );
