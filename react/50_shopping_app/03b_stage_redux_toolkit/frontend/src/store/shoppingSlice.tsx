import ShoppingItem from '../models/ShoppingItem';
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import type {ShoppingState,Message,FetchItem} from '../types/states';
import {logout,loading,stopLoading} from './loginSlice';

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

export const getList = createAsyncThunk("getlist", async (token:string,thunkApi) => {
	const request = new Request("/api/shopping",{
		method:"GET",
		headers:{
			"token":token
		}
	})
	thunkApi.dispatch(loading());
	const response = await fetch(request);
	thunkApi.dispatch(stopLoading());
	if(response.ok) {
		const temp = await response.json();
		const list = temp as ShoppingItem[];
		return list;
	} else {
		if(response.status === 403) {
			thunkApi.dispatch(logout({
				"message":"Your session has expired",
				"token":token
			}))
			return {"message":""}
		}
		return {"message":"Server responded with a status "+response.status+" "+response.statusText}
	}
})

export const add = createAsyncThunk("add",async (data:FetchItem,thunkApi) => {
	const request = new Request("/api/shopping",{
		method:"POST",
		headers:{
			"Content-Type":"application/json",
			"token":data.token
		},
		body:JSON.stringify(data.item)
	})
	thunkApi.dispatch(loading());
	const response = await fetch(request);
	thunkApi.dispatch(stopLoading());
	if(response.ok) {
		thunkApi.dispatch(getList(data.token));
		return {"message":""}
	} else {
		return {"message":"Server responded with a status "+response.status+" "+response.statusText}
	}
})

export const remove = createAsyncThunk("remove",async (data:Message,thunkApi) => {
	let token = "";
	if(data.token) {
		token = data.token
	}
	const request = new Request("/api/shopping/"+data.message,{
		method:"DELETE",
		headers:{
			"token":token
		}
	})
	thunkApi.dispatch(loading());
	const response = await fetch(request);
	thunkApi.dispatch(stopLoading());
	if(response.ok) {
		thunkApi.dispatch(getList(token));
		return {"message":""}
	} else {
		return {"message":"Server responded with a status "+response.status+" "+response.statusText}
	}
})

export const edit = createAsyncThunk("edit", async (data:FetchItem,thunkApi) => {
	const request = new Request("/api/shopping/"+data.item.id,{
		method:"PUT",
		headers:{
			"Content-Type":"application/json",
			"token":data.token
		},
		body:JSON.stringify(data.item)
	})
	thunkApi.dispatch(loading());
	const response = await fetch(request);
	thunkApi.dispatch(stopLoading());
	if(response.ok) {
		thunkApi.dispatch(getList(data.token));
		return {"message":""}
	} else {
		return {"message":"Server responded with a status "+response.status+" "+response.statusText}
	}
	
})

const shoppingSlice = createSlice({
	name:"Shopping",
	initialState,
	reducers:{},
	extraReducers:(builder) => {
		builder.addCase(getList.fulfilled,(state,action) => {
			if (Array.isArray(action.payload)) {
				state.list = action.payload as ShoppingItem[];
			} else {
				const data = action.payload as Message;
				if(data.message) {
					state.error = data.message;
				}
			}
		})
		builder.addCase(add.fulfilled, (state,action) => {
			const message = action.payload as Message;
			if(message.message) {
				state.error = message.message;
			}
		})
		builder.addCase(remove.fulfilled, (state,action) => {
			const message = action.payload as Message;
			if(message.message) {
				state.error = message.message;
			}
		})
		builder.addCase(edit.fulfilled, (state,action) => {
			const message = action.payload as Message;
			if(message.message) {
				state.error = message.message;
			}
		})		
		}
})

export default shoppingSlice.reducer;