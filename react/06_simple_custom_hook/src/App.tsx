import useCount from './hooks/useCount';

function App() {

	const {count,add,subtract} = useCount(10);
	
	return (
		<>
			<h2>Current count:{count}</h2>
			<button onClick={add}>+</button>
			<button onClick={subtract}>-</button>
		</>
	)
}

export default App
