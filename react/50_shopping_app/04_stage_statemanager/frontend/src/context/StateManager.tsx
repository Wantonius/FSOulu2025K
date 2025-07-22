import React,{useReducer} from 'react';
import ActionContext from './ActionContext';
import AppStateContext from './AppStateContext';
import type {AppState} from '../types/AppState';
import type {Action} from '../types/Action';
import * as actionConstants from '../types/actionConstants';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
	children:React.ReactNode;
}

const getInitialState = ():AppState => {
	const state = sessionStorage.getItem("state");
	if(state) {
		return JSON.parse(state);
	} else {
		return {
			list:[],
			isLogged:false,
			loading:false,
			token:"",
			user:"",
			error:""
		}
	}
}

const saveToStorage = (state:AppState) => {
	sessionStorage.setItem("state",JSON.stringify(state));
}

const initialState = getInitialState();

const listReducer = (state:AppState,action:Action):AppState => {
	switch(action.type) {
		case actionConstants.LOADING:{
			return {
				...state,
				error:"",
				loading:true
			}
		}
		case actionConstants.STOP_LOADING:{
			return {
				...state,
				loading:false
			}
		}
		case actionConstants.REGISTER_SUCCESS: {
			const tempState = {
				...state,
				error:"Register Success"
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.LOGIN_SUCCESS: {
			const token = action.payload as string;
			const tempState = {
				...state,
				isLogged:true,
				token:token
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.FETCH_LIST_SUCCESS: {
			const list = action.payload as ShoppingItem[];
			const tempState = {
				...state,
				list:list
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.LOGOUT_SUCCESS: {
			const tempState = {
				list:[],
				isLogged:false,
				loading:false,
				token:"",
				user:"",
				error:""
			}
			saveToStorage(tempState);
			return tempState
		}
		case actionConstants.LOGOUT_FAILED: {
			const error = action.payload as string;
			const tempState = {
				list:[],
				isLogged:false,
				loading:false,
				token:"",
				user:"",
				error:error
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.SET_USER: {
			const user = action.payload as string;
			const tempState = {
				...state,
				user:user
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.ADD_ITEM_SUCCESS:
		case actionConstants.REMOVE_ITEM_SUCCESS:
		case actionConstants.EDIT_ITEM_SUCCESS:
			return state;
		case actionConstants.REGISTER_FAILED:
		case actionConstants.LOGIN_FAILED:
		case actionConstants.FETCH_LIST_FAILED:
		case actionConstants.ADD_ITEM_FAILED:
		case actionConstants.REMOVE_ITEM_FAILED:
		case actionConstants.EDIT_ITEM_FAILED:{
			const error = action.payload as string;
			const tempState = {
				...state,
				error:error
			}
			saveToStorage(tempState);
			return tempState;
		}
		default:
			return state;
	}
}

const StateManager = (props:Props) => {
	
	const [state,dispatch] = useReducer(listReducer,initialState);
	
	return(
		<AppStateContext.Provider value={state}>
			<ActionContext.Provider value={{dispatch:dispatch}}>
				{props.children}
			</ActionContext.Provider>
		</AppStateContext.Provider>
	)
}

export default StateManager;