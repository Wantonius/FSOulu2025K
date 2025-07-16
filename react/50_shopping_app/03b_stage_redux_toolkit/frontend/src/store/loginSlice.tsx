import User from '../models/User';
import type {LoginState,Message,Token} from '../types/states';
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

const getInitialState  = ():LoginState => {
	const temp = sessionStorage.getItem("loginstate");
	if(temp) {
		return JSON.parse(temp);
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

const initialState = getInitialState();

const saveToStorage = (state:LoginState) => {
	sessionStorage.setItem("loginstate",JSON.stringify(state));
}



export const register = createAsyncThunk("register",async (user:User,thunkApi) => {
	const request = new Request("/register",{
		method:"POST",
		headers:{
			"Content-Type":"application/json"
		},
		body:JSON.stringify(user)
	})
	const response = await fetch(request);
	if(response.ok) {
		return {"message":"Register Success"}
	} else {
		if(response.status === 409) {
			return {"message":"Username already in use"}
		}
		return {"message":"Server responded with a status "+response.status+" "+response.statusText}
	}	
})

export const login = createAsyncThunk("login",async (user:User,thunkApi) => {
	const request = new Request("/login",{
		method:"POST",
		headers:{
			"Content-Type":"application/json"
		},
		body:JSON.stringify(user)
	})
	const response = await fetch(request);
	if(response.ok) {
		thunkApi.dispatch(setUser(user.username));
		const temp = await response.json();
		const data = temp as Token;
		//TODO dispatch getlist;
		return {
			"message":"Success",
			"token":data.token
		}
	} else {
		return {
			"message":"Server responded with a status "+response.status+" "+response.statusText
		}
	}
})

export const logout = createAsyncThunk("logout", async (message:Message,thunkApi) => {
	let token = "";
	if(message.token) {
		token = message.token;
	}
	const request = new Request("/logout",{
		method:"POST",
		headers:{
			"token":token
		}
	})
	const response = await fetch(request);
	if(!response) {
		return {
			"message":"Server never responded"
		}
	}
	if(message.message) {
		return {
			"message":message.message
		}
	}
	return {"message":""}
})

const loginSlice = createSlice({
	name:"Login",
	initialState,
	reducers:{
		setUser:(state,action) => {
			state.user = action.payload as string;
		},
		loading:(state,action) => {
			state.loading = true;
		},
		stopLoading:(state,action) => {
			state.loading = false;
		}
	},
	extraReducers:(builder) => {
		builder.addCase(register.pending,(state,action) => {
			state.loading = true;
		})
		builder.addCase(register.fulfilled,(state,action) => {
			const message = action.payload as Message;
			state.error = message.message
			state.loading = false;
		})
		builder.addCase(login.pending,(state,action) => {
			state.loading = true;
		})
		builder.addCase(login.fulfilled,(state,action) => {
			const message = action.payload as Message;
			state.loading = false;
			if(message.token) {
				state.token = message.token
				state.isLogged = true;
			}
		})
		builder.addCase(logout.pending,(state,action) => {
			state.loading = true;
		})
		builder.addCase(logout.fulfilled,(state,action) => {
			const message = action.payload as Message;
			state.error = message.message;
			state.loading = false;
			state.isLogged = false;
			state.token = "";
			state.user = "";
		})
	}
})

export const {setUser,loading,stopLoading} = loginSlice.actions;
export default loginSlice.reducer;