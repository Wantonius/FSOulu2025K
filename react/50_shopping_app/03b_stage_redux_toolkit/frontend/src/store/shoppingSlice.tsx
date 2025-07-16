import ShoppingItem from '../models/ShoppingItem';
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import type {ShoppingState} from '../types/states';

const getInitialState = ():ShoppingState => {
	const state = sessionStorage.getItem("shoppingstate");
	if(state) {
		return JSON.parse(state); 
	} else {
		return {
			list:[],
			error:""
		}
	}
}

const initialState = getInitialState();

const saveToStorage = (state:ShoppingState) => {
	sessionStorage.setItem("shoppingstate",JSON.stringify(state));
}

const shoppingSlice = createSlice({
	name:"Shopping",
	initialState,
	reducers:{}
})

export default shoppingSlice.reducer;