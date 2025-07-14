import Navbar from './components/Navbar';
import HotelList from './components/HotelList';
import HotelForm from './components/HotelForm';
import {Routes,Route,Navigate} from 'react-router-dom';
function App() {
  
	return (
		<>
			<Navbar/>
			<Routes>
				<Route path="/" element={<HotelList/>}/>
				<Route path="/form" element={<HotelForm/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
		</>
	)
}

export default App
