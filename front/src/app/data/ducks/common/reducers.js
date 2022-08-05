import { combineReducers } from "redux";
import types from "./types";
import createReducer from "../../utils/createReducer";

const menus = createReducer( [ ] )( {
    [ types.FETCH_MENUS ]: ( state, action ) => action.payload.result,
} );

 const uploadPhoto = createReducer( [ ] )( {
    [ types.UPLOAD_PHOTO ]: ( state, action ) => action.payload,
} );


export default combineReducers( {
    menus,
    uploadPhoto
} );
