import * as actionConstants from '../types/actionConstants';
import User from '../models/User';
import type {Action} from '../types/states';
import type {ThunkDispatch} from 'redux-thunk';

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

const handleLogin = async (request:Request,act:string,dispatch:ThunkDispatch<any,any,Action>) => {
	dispatch(loading());
	const response = await fetch(request);
	dispatch(stopLoading());
	if(!response) {
		//TODO logout
		return;
	}
	if(response.ok) {
		switch(act) {
			case "register": {
				dispatch(registerSuccess());
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