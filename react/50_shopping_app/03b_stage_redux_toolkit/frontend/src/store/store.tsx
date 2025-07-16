import loginReducer from './loginSlice';
import shoppingReducer from './shoppingSlice';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
	reducer:{
		login:loginReducer,
		shopping:shoppingReducer
	}
});

export default store;