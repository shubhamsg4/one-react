import { combineReducers } from 'redux';
import authUser from './auth/reducer';
import productUser from './product/reducer';
const reducers = combineReducers({
    authUser,
    productUser
});

export default reducers;