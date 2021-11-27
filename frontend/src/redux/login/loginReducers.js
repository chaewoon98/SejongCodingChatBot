import {
    LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_PENDING,
    LOGIN_BEFORE, LOGIN_ORIGIN, CHANGE_SIGNUP_AUTH, CHANGE_SIGNUP_AUTH2, CHANGE_USER_ID, CHANGE_USER_NAME
} from './loginTypes';

const initialState = {

    signupAuth: false,
    signupAuth2: false,
    type: LOGIN_ORIGIN,
    userId: '',
    userName: '',
};

const loginReducer = (state = initialState, action) => {
    const { type, data } = action;

    switch (type) {

        case LOGIN_PENDING:
            return {
                ...state,
                type: LOGIN_PENDING,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                type: LOGIN_SUCCESS,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                type: LOGIN_FAIL
            }
        case LOGIN_BEFORE:
            return {
                ...state,
                type: LOGIN_BEFORE
            }
        case CHANGE_SIGNUP_AUTH:
            return {
                ...state,
                signupAuth: data.signupAuth,
            }

        case CHANGE_SIGNUP_AUTH2:
            return {
                ...state,
                signupAuth2: data.signupAuth,
            }

        case CHANGE_USER_ID:
            return {
                ...state,
                userId: data.userId
            }

        case CHANGE_USER_NAME:
            return {
                ...state,
                userName: data.userName
            }

        default:
            return state;
    }
};

export default loginReducer;
