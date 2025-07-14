import Hotel from '../models/Hotel';
import type {Reducer} from 'redux';

export interface Action {
	type:string;
	payload: Hotel | number;
}

export interface AppState {
	list:Hotel[];
	id:number;
}

const initialState:AppState = {
	list:[],
	id:100
}

const hotelReducer:Reducer<AppState,Action> = (state = initialState,action) => {
	console.log(action);
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
			const temp = action.payload as number;
			const list = state.list.filter(hotel => hotel.id !== temp);
			return {
				...state,
				list:list
			}
		}
		default:
			return state;
	}
}

export default hotelReducer;