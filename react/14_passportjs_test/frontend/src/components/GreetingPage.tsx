interface Props {
	greeting:string;
	logout():void;
	getGreeting():void;
}

const GreetingPage = (props:Props) => {

	return(
		<>
			<h2>Greeting:{props.greeting}</h2>
			<button onClick={props.getGreeting}>Get Greeting</button>
			<button onClick={props.logout}>Logout</button>
		</>
	)
}

export default GreetingPage;