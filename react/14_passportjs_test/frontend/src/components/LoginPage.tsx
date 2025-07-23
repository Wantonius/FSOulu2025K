import React,{useState} from 'react';

interface Props {
	register(username:string,password:string):void;
	login(username:string,password:string):void;
}

interface State {
	username:string;
	password:string;
}

const LoginPage =(props:Props) => {
	
	const [state,setState] = useState<State>({
		username:"",
		password:""
	})
	
	const onChange =(event:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onRegister = (event:React.SyntheticEvent) => {
		event.preventDefault();
		props.register(state.username,state.password);
	}

	const onLogin = (event:React.SyntheticEvent) => {
		event.preventDefault();
		props.login(state.username,state.password);
	}	
	
	return(
		<div style={{margin:"auto"}}>
			<form>
				<label htmlFor="username">Username</label>
				<input type="text"
						name="username"
						id="username"
						onChange={onChange}
						value={state.username}/>
				<br/>
				<label htmlFor="password">Password</label>
				<input type="password"
						name="password"
						id="password"
						onChange={onChange}
						value={state.password}/>
				<br/>
				<button onClick={onRegister}>Register</button>
				<button onClick={onLogin}>Login</button>
			</form>
		</div>
	)
}

export default LoginPage;