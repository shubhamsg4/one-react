import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import productSaga from './product/saga'

export default function* rootSaga(getState) {
    yield all([
        authSaga(),
        productSaga()
    ]);
}
