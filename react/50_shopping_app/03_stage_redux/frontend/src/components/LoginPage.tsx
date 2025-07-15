import React,{useState} from 'react';
import {Box,Button,TextField} from '@mui/material';
import User from '../models/User';
import {register,login,registerFailed} from '../actions/loginActions';
import type {Action} from '../types/states';
import type {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';

interface State {
	username:string;
	password:string;
}

interface Props {
	register(user:User):void;
	login(user:User):void;
	setError(error:string):void;	
}

const LoginPage = (props:Props) => {
	
	const [state,setState] = useState<State>({
		username:"",
		password:""
	})
	
	const dispatch:ThunkDispatch<any,any,Action> = useDispatch();
	
	const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onRegister = (event:React.SyntheticEvent) => {
		event.preventDefault();
		if(state.username.length < 4 || state.password.length < 8) {
			dispatch(registerFailed("Username must be at least 4 and password 8 characters long"));
			return;
		}
		const user = new User(state.username,state.password);
		dispatch(register(user));
	}
	
	const onLogin = (event:React.SyntheticEvent) => {
		event.preventDefault();
		if(state.username.length < 4 || state.password.length < 8) {
			dispatch(registerFailed("Username must be at least 4 and password 8 characters long"));
			return;
		}
		const user = new User(state.username,state.password);
		dispatch(login(user));
	}
	
	return (
		<Box component="form" sx={{width:"20%",mx:"auto"}}>
			<TextField	
				type="text"
				name="username"
				id="username"
				label="Username"
				onChange={onChange}
				sx={{mb:3}}
				value={state.username}/>
			<br/>
			<TextField
				type="password"
				name="password"
				id="password"
				label="Password"
				onChange={onChange}
				sx={{mb:3}}
				value={state.password}/>
			<br/>
			<Button type="button" onClick={onRegister} variant="contained" color="primary" sx={{mr:3}}>Register</Button>
			<Button type="button" onClick={onLogin} variant="contained" color="secondary" sx={{ml:3}}>Login</Button>
		</Box>
	)
}

export default LoginPage;