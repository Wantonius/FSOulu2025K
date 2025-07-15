import * as actionConstants from '../types/actionConstants';
import User from '../models/User';
import type {Action} from '../types/states';
import type {ThunkDispatch} from 'redux-thunk';
import {getList} from './shoppingActions';

interface Token {
	token:string;
}

//ASYNC THUNKS

export const register = (user:User) => {
	return (dispatch:ThunkDispatch<any,any,Action>) => {
		const request = new Request("/register",{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(user)
		})
		handleLogin(request,"register",dispatch);
	}
}

export const login = (user:User) => {
	return (dispatch:ThunkDispatch<any,any,Action>) => {
		dispatch(setUser(user.username));
		const request = new Request("/login",{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(user)
		})
		handleLogin(request,"login",dispatch);
	}
}

export const logout = (token:string) => {
	return (dispatch:ThunkDispatch<any,any,Action>) => {
		const request = new Request("/logout",{
			method:"POST",
			headers:{
				"token":token
			}
		})
		handleLogin(request,"logout",dispatch);
	}
}

const handleLogin = async (request:Request,act:string,dispatch:ThunkDispatch<any,any,Action>) => {
	dispatch(loading());
	const response = await fetch(request);
	dispatch(stopLoading());
	if(!response) {
		dispatch(logoutFailed("Server failed to respond."))
		return;
	}
	if(response.ok) {
		switch(act) {
			case "register": {
				dispatch(registerSuccess());
				return;
			}
			case "login": {
				const temp = await response.json();
				if(!temp) {
					dispatch(loginFailed("Failed to parse login information. Try again later."));
					return;
				}
				const data = temp as Token;
				dispatch(loginSuccess(data.token));
				dispatch(getList(data.token));
				return;
			}
			case "logout": {
				dispatch(logoutSuccess());
				return;
			}			
			default:
				return;
		}
	} else {
		const errorMessage = " Server responded with a status "+response.status+" "+response.statusText
		switch(act) {
			case "register": {
				if(response.status === 409) {
					dispatch(registerFailed("Username already in use"));
					return;
				}
				dispatch(registerFailed("Register failed."+errorMessage));
				return;
			}
			case "login": {
				dispatch(loginFailed("Login failed."+errorMessage));
				return;
			}
			case "logout": {
				dispatch(logoutFailed("Server responded with an error. Logging you out."));
				return;
			}
			default:
				return;
		}
	}
}
//ACTION CREATORS

export const loading = () => {
	return {
		type:actionConstants.LOADING
	}
};

export const stopLoading = () => {
	return {
		type:actionConstants.STOP_LOADING
	}
}

const registerSuccess = () => {
	return {
		type:actionConstants.REGISTER_SUCCESS
	}
}

export const registerFailed = (error:string) => {
	return {
		type:actionConstants.REGISTER_FAILED,
		payload:error
	}
}

const loginSuccess = (token:string) => {
	return {
		type:actionConstants.LOGIN_SUCCESS,
		payload:token
	}
}

const loginFailed = (error:string) => {
	return {
		type:actionConstants.LOGIN_FAILED,
		payload:error
	}
}

const logoutSuccess = () => {
	return {
		type:actionConstants.LOGOUT_SUCCESS
	}
}

export const logoutFailed = (error:string) => {
	return {
		type:actionConstants.LOGOUT_FAILED,
		payload:error
	}
}

const setUser = (user:string) => {
	return {
		type:actionConstants.SET_USER,
		payload:user
	}
}