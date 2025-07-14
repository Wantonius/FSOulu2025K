import type {Reducer} from 'redux';

export interface Action {
	type:string;
}

export interface State {
	count:number;
}

const initialState:State = {
	count:0
}

const countReducer:Reducer<State,Action> = (state = initialState,action) => {
	console.log(action);
	console.log(state);
	switch(action.type) {
		case "INCREMENT": {
			return {
				count:state.count+1
			}
		}
		case "DECREMENT": {
			return {
				count:state.count-1
			}
		}
		default:
			return state;
	}
}

export default countReducer;