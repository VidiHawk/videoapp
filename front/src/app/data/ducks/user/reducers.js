import { combineReducers } from "redux";
import types from "./types";
import createReducer from "../../utils/createReducer";

const login = createReducer( [ ] )( {
    [ types.LOGIN ]: ( state, action ) => action.payload,
} );

const register = createReducer( [ ] )( {
    [ types.REGISTER ]: ( state, action ) => action.payload,
} );

const me = createReducer( [ ] )( {
    [ types.ME ]: ( state, action ) => action.payload,
} );

const editProfile = createReducer( [ ] )( {
    [ types.EDIT_PROFILE ]: ( state, action ) => action.payload,
} );

const changePassword = createReducer( [ ] )( {
    [ types.CHANGE_PASSSWORD ]: ( state, action ) => action.payload,
} );


export default combineReducers( {
    login,
    register,
    me,
    editProfile,
    changePassword
} );
