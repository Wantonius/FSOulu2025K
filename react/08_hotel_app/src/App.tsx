import useAction from './hooks/useAction';
import HotelForm from './components/HotelForm';
import HotelList from './components/HotelList';
import Navbar from './components/Navbar';
import {Route,Routes,Navigate} from 'react-router-dom';

function App() {
  
	const {list,addHotel,removeHotel} = useAction();

	return (
		<>
			<Navbar/>
			<hr/>
			<Routes>
				<Route path="/" element={<HotelList list={list} removeHotel={removeHotel}/>}/>
				<Route path="/form" element={<HotelForm addHotel={addHotel}/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
		</>
	)
}

export default App
