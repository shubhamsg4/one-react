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
const STORE_STATE = {
    loading: false,
    error: "",
    success: "",
    productArray: [],
    addProductSuccess: "",
    updateProductSuccess: "",
    deleteProductSuccess: ""
}

export default (state = STORE_STATE, action) => {
    switch (action.type) {
        case ADD_PRODUCT:

            return { ...state, loading: true, error: "", successLogin: '' };
        case ADD_PRODUCT_SUCCESS:

            console.log(action.payload)
            return {
                ...state,
                loading: false,
                addProductSuccess: action.payload,
            };
        case ADD_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                success: "",
                error: action.payload.message
            };
        case UPDATE_PRODUCT:
            return { ...state, loading: true, error: "" };
        case UPDATE_PRODUCT_SUCCESS:

            console.log(action.payload)
            return {
                ...state, loading: false, updateProductSuccess: action.payload
                , error: ""
            };

        case UPDATE_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.message
            };

        case GET_PRODUCT:
            return { ...state, loading: true, error: "" };
        case GET_PRODUCT_SUCCESS:

            console.log(action.payload)
            return {
                ...state, loading: false, productArray: action.payload
                , error: ""
            };

        case GET_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.message
            };
        case DELETE_PRODUCT:
            return { ...state, loading: true, error: "" };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state, loading: false, deleteProductSuccess: action.payload
                , error: ""
            };

        case DELETE_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.message
            };
        default:
            return { ...state };
    }
}