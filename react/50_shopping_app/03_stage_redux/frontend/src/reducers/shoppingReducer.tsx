import * as actionConstants from '../types/actionConstants';
import type {Reducer} from 'redux';
import type {ShoppingState,Action} from '../types/states';
import ShoppingItem from '../models/ShoppingItem';

const getInitialState = ():ShoppingState => {
	const temp = sessionStorage.getItem("shoppingstate");
	if(temp) {
		const state:ShoppingState = JSON.parse(temp);
		return state;
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

const shoppingReducer:Reducer<ShoppingState,Action> = (state = initialState,action):ShoppingState => {
	console.log("ShoppingReducer, action",action);
	switch(action.type) {
		case actionConstants.LOADING: {
			return {
				...state,
				error:""
			}
		}
		case actionConstants.FETCH_LIST_SUCCESS:{
			let temp = [];
			if(action.payload) {
				temp = action.payload as ShoppingItem[];
			}
			const tempState = {
				...state,
				list:temp
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.ADD_ITEM_SUCCESS:
		case actionConstants.REMOVE_ITEM_SUCCESS:
		case actionConstants.EDIT_ITEM_SUCCESS:
			return state;
		case actionConstants.FETCH_LIST_FAILED:
		case actionConstants.ADD_ITEM_FAILED:
		case actionConstants.REMOVE_ITEM_FAILED:
		case actionConstants.EDIT_ITEM_FAILED: {
			let temp = "";
			if(action.payload) {
				temp = action.payload as string;
			}
			const tempState = {
				...state,
				error:temp
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.LOGOUT_SUCCESS:
		case actionConstants.LOGOUT_FAILED: {
			const tempState = {
				list:[],
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		}
		default:
			return state;
	}
}

export default shoppingReducer;