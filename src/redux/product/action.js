import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_ERROR,
    GET_PRODUCT,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_ERROR,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR
} from '../action';
export const addProduct = (user, history) => ({
    type: ADD_PRODUCT,
    payload: { user, history }
});
export const addProductSuccess = user => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: user
});
export const addProductError = message => ({
    type: ADD_PRODUCT_ERROR,
    payload: { message }
});
export const updateProduct = (user, history) => ({
    type: UPDATE_PRODUCT,
    payload: { user, history },
});
export const updateProductSuccess = user => ({
    type: UPDATE_PRODUCT_SUCCESS,
    payload: user
});
export const updateProductError = message => ({
    type: UPDATE_PRODUCT_ERROR,
    payload: { message }
});

export const getProduct = (user, history) => ({
    type: GET_PRODUCT,
    payload: { user, history },
});
export const getProductSuccess = user => ({
    type: GET_PRODUCT_SUCCESS,
    payload: user
});
export const getProductError = message => ({
    type: GET_PRODUCT_ERROR,
    payload: { message }
});

export const deleteProduct = (user, history) => ({
    type: DELETE_PRODUCT,
    payload: { user, history },
});
export const deleteProductSuccess = user => ({
    type: DELETE_PRODUCT_SUCCESS,
    payload: user
});
export const deleteProductError = message => ({
    type: DELETE_PRODUCT_ERROR,
    payload: { message }
});