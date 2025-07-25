import React,{useState} from 'react';
import {Box,Button,TextField} from '@mui/material';
import User from '../models/User';
import useAction from '../hooks/useAction';

interface State {
	username:string;
	password:string;
}

const LoginPage = () => {
	
	const [state,setState] = useState<State>({
		username:"",
		password:""
	})
	
	const {register,login,setError} = useAction();
	
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
			setError("Username must be at least 4 and password 8 characters long");
			return;
		}
		const user = new User(state.username,state.password);
		register(user);
	}
	
	const onLogin = (event:React.SyntheticEvent) => {
		event.preventDefault();
		if(state.username.length < 4 || state.password.length < 8) {
			setError("Username must be at least 4 and password 8 characters long");
			return;
		}
		const user = new User(state.username,state.password);
		login(user);
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