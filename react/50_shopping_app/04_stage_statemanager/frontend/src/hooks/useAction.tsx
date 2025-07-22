import {useState,useEffect,useContext} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import User from '../models/User';
import * as actionConstants from '../types/actionConstants';
import useAppState from './useAppState';
import ActionContext from '../context/ActionContext';


//Helper state to setup and trigger communication with backend. Contains url, headers and body and information on what we are doing.

interface UrlRequest {
	request:Request;
	action:string;
}

//Token interface to facilitate getting the token from login

interface Token {
	token:string;
}

const useAction = () => {
	
	const [urlRequest,setUrlRequest] = useState<UrlRequest>({
		request:new Request("",{}),
		action:""
	});

	const {dispatch} = useContext(ActionContext);
	const {token} = useAppState();

	const setError = (error:string) => {
		dispatch({
			type:actionConstants.REGISTER_FAILED,
			payload:error
		})
	}
	
	
	//UseEffect to communicate with backend using UrlRequest
	
	useEffect(() => {
		
		const fetchData = async () => {
			dispatch({
				type:actionConstants.LOADING,
				payload:""
			})
			const response = await fetch(urlRequest.request);
			dispatch({
				type:actionConstants.STOP_LOADING,
				payload:""
			}) 
			if(!response) {
				dispatch({
					type:actionConstants.LOGOUT_FAILED,
					payload:"Server never responded"
				})	 	
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist": {
						const temp = await response.json();
						if(!temp) {
							dispatch({
								type:actionConstants.FETCH_LIST_FAILED,
								payload:"Failed to parse shopping information. Try again later."
							})
							return;
						}
						const list = temp as ShoppingItem[];
						dispatch({
							type:actionConstants.FETCH_LIST_SUCCESS,
							payload:list
						})
						return;
					}
					case "additem":
						dispatch({
							type:actionConstants.ADD_ITEM_SUCCESS,
							payload:""
						})
						getList(token);
						return;
					case "removeitem":
						dispatch({
							type:actionConstants.REMOVE_ITEM_SUCCESS,
							payload:""
						})
						getList(token);
						return;
					case "edititem": {
						dispatch({
							type:actionConstants.EDIT_ITEM_SUCCESS,
							payload:""
						})
						getList(token);
						return;
					}
					case "register":{
						dispatch({
							type:actionConstants.REGISTER_SUCCESS,
							payload:""
						})
						return;
					}
					case "login":{
						const token = await response.json();
						if(!token) {
							dispatch({
								type:actionConstants.LOGIN_FAILED,
								payload:"Failed to parse login information. Try again later."
							});
							return;
						}
						const data = token as Token;
						dispatch({
							type:actionConstants.LOGIN_SUCCESS,
							payload:data.token
						});
						return;
					}
					case "logout":{
						dispatch({
							type:actionConstants.LOGOUT_SUCCESS,
							payload:""
						})
						return;
					}
					default: 
						return;
				}
			} else {
				if(response.status === 403) {
					dispatch({
						type:actionConstants.LOGOUT_FAILED,
						payload:"Your session expired."
					})
					return;
				}
				let errorMessage = " Server responded with a status "+response.status+" "+response.statusText;
				switch(urlRequest.action) {
					case "getlist": {
						dispatch({
							type:actionConstants.FETCH_LIST_FAILED,
							payload:"Failed to fetch list."+errorMessage
						});
						return;
					}
					case "additem": {
						dispatch({
							type:actionConstants.ADD_ITEM_FAILED,
							payload:"Failed to add new item."+errorMessage
						});
						return;
					}
					case "removeitem": {
						dispatch({
							type:actionConstants.REMOVE_ITEM_FAILED,
							payload:"Failed to remove item."+errorMessage
						});
						return;
					}
					case "edititem": {
						dispatch({
							type:actionConstants.EDIT_ITEM_FAILED,
							payload:"Failed to edit item."+errorMessage
						});
						return;
					}
					case "register": {
						if(response.status === 409) {
							errorMessage = " Username already in use";
						}
						dispatch({
							type:actionConstants.REGISTER_FAILED,
							payload:"Register failed."+errorMessage
						});
						return;
					}
					case "login": {
						dispatch({
							type:actionConstants.LOGIN_FAILED,
							payload:"Login failed."+errorMessage
						});
						return;
					}
					case "logout": {
						dispatch({
							type:actionConstants.LOGOUT_FAILED,
							payload:"Server responded with a problem. Logging you out."
						});
						return;
					}
					default:
						return;
				}
			}
		}
		
		fetchData();
		
	},[urlRequest])

	//Helper functions sent to component to trigger communication with backend

	const getList = (token:string) => {
		setUrlRequest({
			request: new Request("/api/shopping",{
				method:"GET",
				headers:{
					"token":token
				}
				}),
			action:"getlist"
		});
	}
	
	const add = (item:ShoppingItem) => {
		setUrlRequest({
			request: new Request("/api/shopping",{
				method:"POST",
				headers:{
					"Content-Type":"application/json",
					"token":token
				},
				body:JSON.stringify(item)
			}),
			action:"additem"
		})
	}
	
	const remove = (id:string) => {
		setUrlRequest({
			request: new Request("/api/shopping/"+id,{
				method:"DELETE",
				headers:{
					"token":token
				}
			}),
			action:"removeitem"
		})
	}

	const edit = (item:ShoppingItem) => {
		setUrlRequest({
			request: new Request("/api/shopping/"+item.id,{
				method:"PUT",
				headers:{
					"Content-Type":"application/json",
					"token":token
				},
				body:JSON.stringify(item)
			}),
			action:"edititem"
		})
	}
	
	const register = (user:User) => {
		setUrlRequest({
			request: new Request("/register",{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(user)
			}),
			action:"register"
		})
	}
	
	const login = (user:User) => {
		dispatch({
			type:actionConstants.SET_USER,
			payload:user.username
		})
		setUrlRequest({
			request: new Request("/login",{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(user)
			}),
			action:"login"
		})
	}
	
	const logout = () => {
		setUrlRequest({
			request:new Request("/logout",{
				method:"POST",
				headers:{
					"token":token
				}
			}),
			action:"logout"
		})
	}
	
	return {getList,add,remove,edit,register,login,logout,setError}
}

export default useAction;