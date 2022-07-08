import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
    LOGIN_USER,
    loginUserSuccess,
    loginUserError,
    REGISTER_USER,
    registerUserSuccess,
    registerUserError,
    GET_ROLES,
    getRolesSuccess,
    getRolesError
} from "../action";
import { localPath } from "../../constants/defaultValues";
// Post Login User
export function loginUserAsync(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.request({
                method: "post",
                url: localPath + "login",
                data: payload
            });

            resolve(result.data);
        } catch (error) {
            reject(error);
        }
    });
}
// Register User
export function registerUserAsync(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.request({
                method: "post",
                url: localPath + "register",
                data: payload
            });
            resolve(result.data);
        } catch (error) {

            reject(error);
        }
    });
}

export function getRolesAsync() {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.request({
                method: "get",
                url: localPath + "roles"
            });

            resolve(result.data);
        } catch (error) {
            reject(error);
        }
    });
}

function setToken(token) {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem("token", token);
            resolve();
        }, 1000);
    });
}
function* loginUser({ payload }) {
    const { history } = payload;
    try {
        let loginUser = yield call(loginUserAsync, payload.user);

        if (loginUser.meta.code === 200 && loginUser.Token) {
            debugger
            setToken(loginUser.Token).then(yield put(loginUserSuccess(loginUser.meta.message)))

        } else if (loginUser.meta.code === 403) {

            yield put(loginUserError(loginUser));
        } else {
            yield put(loginUserError(loginUser.meta.message));
        }
    } catch (error) {
        yield put(loginUserError(error));
    }
}

function* registerUser({ payload }) {
    const { history } = payload;
    try {
        const registerUserData = yield call(registerUserAsync, payload.user);

        if (registerUserData.meta.code === 200) {
            localStorage.setItem("token", registerUserData.Token);
            yield put(registerUserSuccess(registerUserData.meta.message));
        }
        else if (registerUserData.meta.code === 201) {
            yield put(registerUserSuccess(registerUserData.meta.message));
        }
        else if (registerUserData.meta.code === 400) {
            var responseToSring = registerUserData.Data.map(function (item) {
                return Object.values(item).toString();
            });
            yield put(registerUserError(responseToSring.toString()));
        } else {

            yield put(registerUserError(registerUserData.meta.message));
        }
    } catch (error) {
        yield put(registerUserError(error));
    }
}
function* getRoles({ payload }) {
    try {
        const rolesData = yield call(getRolesAsync);

        if (rolesData.meta.code === 200) {
            yield put(getRolesSuccess(rolesData.Data));
        } else {
            yield put(getRolesError(rolesData.meta.message));
        }
    } catch (error) {
        yield put(getRolesError(error));
    }
}
export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginUser);
}
export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, registerUser);
}
export function* watchGetRoles() {
    yield takeEvery(GET_ROLES, getRoles);
}
export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchRegisterUser),
        fork(watchGetRoles)
    ])
}