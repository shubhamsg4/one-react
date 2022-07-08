import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    GET_ROLES,
    GET_ROLES_SUCCESS,
    GET_ROLES_ERROR
} from '../action';
const STORE_STATE = {
    loading: false,
    errorLogin: "",
    successLogin: "",
    error: "",
    success: "",
    registerSuccess: "",
    registerError: "",
    rolesArray: []
}

export default (state = STORE_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:

            return { ...state, loading: true, error: "", successLogin: '' };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                loginSuccessData: action.payload,
                successLogin: action.payload,
            };
        case LOGIN_USER_ERROR:
            return {
                ...state,
                loading: false,
                success: "",
                loginSuccessData: '',
                errorLogin: action.payload.message
            };
        case REGISTER_USER:
            return { ...state, loading: true, error: "" };
        case REGISTER_USER_SUCCESS:
            return {
                ...state, loading: false, registerSuccess: "Registered Successfully"//action.payload
                , error: ""
            };

        case REGISTER_USER_ERROR:
            return {
                ...state,
                loading: false,
                registerError: action.payload.message
            };

        case GET_ROLES:
            return { ...state, loading: true, error: "" };
        case GET_ROLES_SUCCESS:

            console.log(action.payload)
            return {
                ...state, loading: false, rolesArray: action.payload
                , error: ""
            };

        case GET_ROLES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.message
            };
        default:
            return { ...state };
    }
}