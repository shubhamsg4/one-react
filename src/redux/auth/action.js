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
export const loginUser = (user, history) => ({
    type: LOGIN_USER,
    payload: { user, history }
});
export const loginUserSuccess = user => ({
    type: LOGIN_USER_SUCCESS,
    payload: user
});
export const loginUserError = message => ({
    type: LOGIN_USER_ERROR,
    payload: { message }
});
export const registerUser = (user, history) => ({
    type: REGISTER_USER,
    payload: { user, history },
});
export const registerUserSuccess = user => ({
    type: REGISTER_USER_SUCCESS,
    payload: user
});
export const registerUserError = message => ({
    type: REGISTER_USER_ERROR,
    payload: { message }
});

export const getRoles = (user, history) => ({
    type: GET_ROLES,
    payload: { user, history },
});
export const getRolesSuccess = user => ({
    type: GET_ROLES_SUCCESS,
    payload: user
});
export const getRolesError = message => ({
    type: GET_ROLES_ERROR,
    payload: { message }
});
