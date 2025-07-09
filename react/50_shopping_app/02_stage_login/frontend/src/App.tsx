import useAction from './hooks/useAction';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import {Routes,Route,Navigate} from 'react-router-dom';
import LoginPage from './components/LoginPage';
function App() {

	const {state,add,remove,edit,register,login,logout,setError} = useAction();
	
	if(state.isLogged) {
		return (
			<>
				<Navbar isLogged={state.isLogged} user={state.user} loading={state.loading} error={state.error} logout={logout}/>
				<hr/>
				<Routes>
					<Route path="/" element={<ShoppingList list={state.list} remove={remove} edit={edit}/>}/>
					<Route path="/form" element={<ShoppingForm add={add}/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>	
				</Routes>
			</>
		)
	} else {
		return(
			<>				
				<Navbar isLogged={state.isLogged} user={state.user} loading={state.loading} error={state.error} logout={logout}/>
				<hr/>
				<Routes>
					<Route path="/" element={<LoginPage register={register} login={login} setError={setError}/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>	
				</Routes>
			</>	
		)
	}
}

export default App
