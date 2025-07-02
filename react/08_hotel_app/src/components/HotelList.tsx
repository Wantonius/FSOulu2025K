import Hotel from '../models/Hotel';

interface Props {
	list:Hotel[];
	removeHotel(id:number):void;
}

const HotelList = (props:Props) => {
	
	const hotelJSX = props.list.map((hotel) => {
		return (
			<tr key={hotel.id}>
				<td>{hotel.hname}</td>
				<td>{hotel.address}</td>
				<td>{hotel.city}</td>
				<td>{hotel.stars}</td>
				<td>{hotel.roomprice}</td>
				<td><button onClick={() => props.removeHotel(hotel.id)} className="btn btn-danger">Remove</button></td>
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