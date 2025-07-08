import useAction from './hooks/useAction';
import ShoppingForm from './components/ShoppingForm';

function App() {

	const {add} = useAction();
	
	return (
		<>
			<ShoppingForm add={add}/>
		</>
	)
}

export default App
