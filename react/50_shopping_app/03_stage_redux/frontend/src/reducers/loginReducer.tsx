import * as actionConstants from '../types/actionConstants';
import type {Reducer} from 'redux';
import type {LoginState,Action} from '../types/states';

const getInitialState = ():LoginState => {
	const temp = sessionStorage.getItem("loginstate");
	if(temp) {
		const state:LoginState = JSON.parse(temp);
		return state;
	} else {
		return {
			isLogged:false,
			loading:false,
			token:"",
			user:"",
			error:""
		}
	}
}

const initialState:LoginState = getInitialState();

const saveToStorage = (state:LoginState) => {
	sessionStorage.setItem("loginstate",JSON.stringify(state));
}

const loginReducer:Reducer<LoginState,Action> = (state = initialState,action):LoginState => {
	console.log("LoginReducer, action",action);
	switch(action.type) {
		case actionConstants.LOADING: {
			return {
				...state,
				error:"",
				loading:true
			}
		}
		case actionConstants.STOP_LOADING: {
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
		case actionConstants.REGISTER_FAILED:
		case actionConstants.LOGIN_FAILED:{
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
		case actionConstants.LOGIN_SUCCESS: {
			let temp = "";
			if(action.payload) {
				temp = action.payload as string;
			}
			const tempState = {
				...state,
				isLogged:true,
				token:temp
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.LOGOUT_SUCCESS: {
			const tempState = {
				isLogged:false,
				loading:false,
				error:"",
				token:"",
				user:""
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.LOGOUT_FAILED: {
			let temp = "";
			if(action.payload) {
				temp = action.payload as string;
			}
			const tempState = {
				isLogged:false,
				loading:false,
				error:temp,
				token:"",
				user:""
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.SET_USER:
			let temp = "";
			if(action.payload) {
				temp = action.payload as string;
			}
			const tempState = {
				...state,
				user:temp
			}
			saveToStorage(tempState);
			return tempState;
		default:
			return state;
	}
}

export default loginReducer;