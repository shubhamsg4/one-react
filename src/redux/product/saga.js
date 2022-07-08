import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
    ADD_PRODUCT,
    addProductSuccess,
    addProductError,
    UPDATE_PRODUCT,
    updateProductSuccess,
    updateProductError,
    GET_PRODUCT,
    getProductSuccess,
    getProductError,
    DELETE_PRODUCT,
    deleteProductSuccess,
    deleteProductError,
} from "../action";
import { localPath } from "../../constants/defaultValues";
import * as authService from '../../helpers/authService';
export function addProductAsync(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.request({
                method: "post",
                url: localPath + "products",
                data: payload,
                headers: { 'Authorization': authService.getToken() }
            });

            resolve(result.data);
        } catch (error) {
            reject(error);
        }
    });
}

export function updateProductAsync(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.request({
                method: "put",
                url: localPath + "products",
                data: payload,
                headers: { 'Authorization': authService.getToken() }
            });
            resolve(result.data);
        } catch (error) {

            reject(error);
        }
    });
}

export function getProductAsync() {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.request({
                method: "get",
                url: localPath + "products",
                headers: { 'Authorization': authService.getToken() }
            });
            resolve(result.data);
        } catch (error) {
            reject(error);
        }
    });
}

export function deleteProductAsync(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.request({
                method: "delete",
                url: localPath + "products",
                data: payload,
                headers: { 'Authorization': authService.getToken() }
            });

            resolve(result.data);
        } catch (error) {
            reject(error);
        }
    });
}

function* addProduct({ payload }) {
    const { history } = payload;
    try {
        let addProduct = yield call(addProductAsync, payload.user);
        if (addProduct.meta.code === 201) {

            yield put(addProductSuccess(addProduct.meta.message));

        } else {
            yield put(addProductError(addProduct.meta.message));
        }
    } catch (error) {
        yield put(addProductError(error));
    }
}

function* updateProduct({ payload }) {
    const { history } = payload;
    try {

        const updateProductData = yield call(updateProductAsync, payload.user);

        if (updateProductData.meta.code === 200) {
            yield put(updateProductSuccess(updateProductData.meta.message));
        }
        else {

            yield put(updateProductError(updateProductData.meta.message));
        }
    } catch (error) {
        yield put(updateProductError(error));
    }
}
function* getProduct({ payload }) {
    try {
        const getProductData = yield call(getProductAsync);

        if (getProductData.meta.code === 200) {

            yield put(getProductSuccess(getProductData.Data));
        } else {
            yield put(getProductError(getProductData.meta.message));
        }
    } catch (error) {
        yield put(getProductError(error));
    }
}

function* deleteProduct({ payload }) {
    try {

        const deleteProductData = yield call(deleteProductAsync, payload.user);

        if (deleteProductData.meta.code === 200) {
            yield put(deleteProductSuccess(deleteProductData.Data));
        } else {
            yield put(deleteProductError(deleteProductData.meta.message));
        }
    } catch (error) {
        yield put(deleteProductError(error));
    }
}
export function* watchaddProduct() {
    yield takeEvery(ADD_PRODUCT, addProduct);
}
export function* watchupdateProduct() {
    yield takeEvery(UPDATE_PRODUCT, updateProduct);
}
export function* watchgetProduct() {
    yield takeEvery(GET_PRODUCT, getProduct);
}
export function* watchdeleteProduct() {
    yield takeEvery(DELETE_PRODUCT, deleteProduct);
}
export default function* rootSaga() {
    yield all([
        fork(watchaddProduct),
        fork(watchupdateProduct),
        fork(watchgetProduct),
        fork(watchdeleteProduct)
    ])
}