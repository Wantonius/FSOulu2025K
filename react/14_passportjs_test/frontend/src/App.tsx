import useAction from './hooks/useAction';
import LoginPage from './components/LoginPage';
import GreetingPage from './components/GreetingPage';

function App() {
  
	const {state,register,login,logout,getGreeting} = useAction();

	let message = "No message";
	if(state.loading) {
		message = "Loading ..."
	}
	if(state.message) {
		message = state.message;
	}

	if(state.isLogged) {
		return (
			<>
				<h2>{message}</h2>
				<GreetingPage greeting={state.greeting} getGreeting={getGreeting} logout={logout}/>
			</>
		)
	} else {
		return (
			<>
				<h2>{message}</h2>
				<LoginPage register={register} login={login}/>
			</>
		)
	}
}

export default App
