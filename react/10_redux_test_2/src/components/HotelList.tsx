import Hotel from '../models/Hotel';
import {useDispatch,useSelector} from 'react-redux';
import type {AppState} from '../reducers/hotelReducer';

const HotelList = () => {
	
	const dispatch = useDispatch();
	const listSelector = (state:AppState) => state.list;
	const list = useSelector(listSelector);
	
	const hotelJSX = list.map((hotel) => {
		return (
			<tr key={hotel.id}>
				<td>{hotel.hname}</td>
				<td>{hotel.address}</td>
				<td>{hotel.city}</td>
				<td>{hotel.stars}</td>
				<td>{hotel.roomprice}</td>
				<td><button onClick={() => dispatch({
					type:"REMOVE_HOTEL",
					payload:hotel.id
				})} className="btn btn-danger">Remove</button></td>
			</tr>
		)
	})
	return(
		<table className="table table-striped">
			<thead>
				<tr>
					<th>Hotel Name</th>
					<th>Address</th>
					<th>City</th>
					<th>Number of Stars</th>
					<th>Room Price</th>
					<th>Remove Hotel</th>
				</tr>
			</thead>
			<tbody>
			{hotelJSX}
			</tbody>
		</table>
	)
}

export default HotelList;