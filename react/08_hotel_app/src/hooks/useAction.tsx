import {useReducer} from 'react';
import Hotel from '../models/Hotel';

interface Action {
	type:string;
	payload:number|Hotel;
}

interface State {
	list:Hotel[];
	id:number;
}

const hotelReducer = (state:State,action:Action):State => {
	console.log("HotelReducer, action:",action.type);
	switch(action.type) {
		case "ADD_HOTEL": {
			const temp = action.payload as Hotel;
			temp.id = state.id;
			return {
				list:state.list.concat(temp),
				id:state.id+1
			}
		}
		case "REMOVE_HOTEL": {
			const temp_id = action.payload as number;
			const tempList = state.list.filter(hotel => hotel.id !== temp_id);
			return {
				...state,
				list:tempList
			}
		}
		default:
			return state;
	}
}

const initialState:State = {
	list:[],
	id:100
}

const useAction = () => {
	
	const [state,dispatch] = useReducer(hotelReducer,initialState);
	
	const addHotel = (hotel:Hotel) => {
		dispatch({
			type:"ADD_HOTEL",
			payload:hotel
		})
	}
	
	const removeHotel = (id:number) => {
		dispatch({
			type:"REMOVE_HOTEL",
			payload:id
		})
	}
	
	return {list:state.list,addHotel,removeHotel};
}

export default useAction;