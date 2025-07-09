import {useState,useEffect} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import User from '../models/User';

//The application state. 

interface State {
	list:ShoppingItem[];
	isLogged:boolean;
	token:string;
	loading:boolean;
	error:string;
	user:string;
}

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
	
	const [state,setState] = useState<State>({
		list:[],
		isLogged:false,
		token:"",
		loading:false,
		error:"",
		user:""
	});
	
	const [urlRequest,setUrlRequest] = useState<UrlRequest>({
		request:new Request("",{}),
		action:""
	});
	
	//Helper functions to run state changes
	
	const setLoading = (loading:boolean) => {
		setState((state) => {
			return {
				...state,
				error:"",
				loading:loading
			}
		})
	}
	
	const setError = (error:string) => {
		setState((state) => {
			const tempState = {
				...state,
				error:error
			}
			saveToStorage(tempState);
			return tempState;
		})
	}
	
	const saveToStorage = (state:State) => {
		sessionStorage.setItem("state",JSON.stringify(state));
	}
	
	const setUser = (user:string) => {
		setState((state) => {
			const tempState = {
				...state,
				user:user
			}
			saveToStorage(tempState);
			return tempState;
		})
	}
	
	const clearState = (error:string) => {
		const tempState ={
			list:[], 
			loading:false,
			isLogged:false,
			token:"",
			user:"",
			error:error
		}
		saveToStorage(tempState);
		setState(tempState);
	}
	
	//UseEffect to get the list at the start of the application
	
	useEffect(() => {
		const temp = sessionStorage.getItem("state");
		if(temp) {
			const state:State = JSON.parse(temp);
			setState(state);
			if(state.isLogged) {
				getList(state.token);
			}
		} 
	},[]);
	
	//UseEffect to communicate with backend using UrlRequest
	
	useEffect(() => {
		
		const fetchData = async () => {
			setLoading(true);
			const response = await fetch(urlRequest.request);
			setLoading(false);
			if(!response) {
				clearState("Server did not respond");
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist": {
						const temp = await response.json();
						if(!temp) {
							setError("Failed to parse response. Try again later.");
							return;
						}
						const list = temp as ShoppingItem[];
						setState((state) => {
							const tempState = {
								...state,
								list:list
							}
							saveToStorage(tempState);
							return tempState;
						})
						return;
					}
					case "additem":
					case "removeitem":
					case "edititem": {
						getList(state.token);
						return;
					}
					case "register":{
						setError("Register success");
						return;
					}
					case "login":{
						const token = await response.json();
						if(!token) {
							setError("Failed to parse login information. Try again later.");
							return;
						}
						const data = token as Token;
						setState((state) => {
							const tempState = {
								...state,
								token:data.token,
								isLogged:true
							}
							saveToStorage(tempState);
							return tempState;
						})
						getList(data.token);
						return;
					}
					case "logout":{
						clearState("");
						return;
					}
					default: 
						return;
				}
			} else {
				let errorMessage = " Server responded with a status "+response.status+" "+response.statusText;
				switch(urlRequest.action) {
					case "getlist": {
						setError("Failed to fetch list."+errorMessage);
						return;
					}
					case "additem": {
						setError("Failed to add new item."+errorMessage);
						return;
					}
					case "removeitem": {
						setError("Failed to remove item."+errorMessage);
						return;
					}
					case "edititem": {
						setError("Failed to edit item."+errorMessage);
						return;
					}
					case "register": {
						if(response.status === 409) {
							errorMessage = " Username already in use";
						}
						setError("Register failed."+errorMessage);
						return;
					}
					case "login": {
						//TODO
						return;
					}
					case "logout": {
						//TODO
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

	const getList = () => {
		setUrlRequest({
			request: new Request("/api/shopping",{
				method:"GET"
				}),
			action:"getlist"
		});
	}
	
	const add = (item:ShoppingItem) => {
		setUrlRequest({
			request: new Request("/api/shopping",{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(item)
			}),
			action:"additem"
		})
	}
	
	const remove = (id:string) => {
		setUrlRequest({
			request: new Request("/api/shopping/"+id,{
				method:"DELETE"
			}),
			action:"removeitem"
		})
	}

	const edit = (item:ShoppingItem) => {
		setUrlRequest({
			request: new Request("/api/shopping/"+item.id,{
				method:"PUT",
				headers:{
					"Content-Type":"application/json"
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
		//TODO
	}
	
	const logout = () => {
		//TODO
	}
	
	return {state,add,remove,edit,register,login,logout,setError}
}

export default useAction;