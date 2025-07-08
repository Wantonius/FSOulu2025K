import {useState,useEffect} from 'react';
import ShoppingItem from '../models/ShoppingItem';

//The application state. Currently with just array of ShoppingItems. Later more

interface State {
	list:ShoppingItem[];
}

//Helper state to setup and trigger communication with backend. Contains url, headers and body and information on what we are doing.

interface UrlRequest {
	request:Request;
	action:string;
}

const useAction = () => {
	
	const [state,setState] = useState<State>({
		list:[]
	});
	
	const [urlRequest,setUrlRequest] = useState<UrlRequest>({
		request:new Request("",{}),
		action:""
	});
	
	//UseEffect to get the list at the start of the application
	
	useEffect(() => {
		getList();
	},[]);
	
	//UseEffect to communicate with backend using UrlRequest
	
	useEffect(() => {
		
		const fetchData = async () => {
			
			const response = await fetch(urlRequest.request);
			if(!response) {
				console.log("Server did not respond");
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist": {
						const temp = await response.json();
						if(!temp) {
							console.log("Failed to parse response.");
							return;
						}
						const list = temp as ShoppingItem[];
						setState({
							list:list
						})
						return;
					}
					case "additem":
					case "removeitem":
					case "edititem": {
						getList();
						return;
					}
					default: 
						return;
				}
			} else {
				const errorMessage = " Server responded with a status "+response.status+" "+response.statusText;
				switch(urlRequest.action) {
					case "getlist": {
						console.log("Failed to fetch list."+errorMessage);
						return;
					}
					case "additem": {
						console.log("Failed to add new item."+errorMessage);
						return;
					}
					case "removeitem": {
						console.log("Failed to remove item."+errorMessage);
						return;
					}
					case "edititem": {
						console.log("Failed to edit item."+errorMessage);
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
	
	return {state,add,remove,edit}
}

export default useAction;