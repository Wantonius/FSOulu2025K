import {useEffect} from 'react';
import useAction from './hooks/useAction';
import useAppState from './hooks/useAppState';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import {Routes,Route,Navigate} from 'react-router-dom';
import LoginPage from './components/LoginPage';
function App() {

	const {getList} = useAction();
	const {isLogged,token} = useAppState();
	
	useEffect(() => {
		if(isLogged) {
			getList(token);
		}
	},[isLogged]);
	
	if(isLogged) {
		return (
			<>
				<Navbar />
				<hr/>
				<Routes>
					<Route path="/" element={<ShoppingList />}/>
					<Route path="/form" element={<ShoppingForm/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>	
				</Routes>
			</>
		)
	} else {
		return(
			<>				
				<Navbar />
				<hr/>
				<Routes>
					<Route path="/" element={<LoginPage />}/>
					<Route path="*" element={<Navigate to="/"/>}/>	
				</Routes>
			</>	
		)
	}
}

export default App
