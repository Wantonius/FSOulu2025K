import ShoppingItem from '../models/ShoppingItem';

interface AppState {
	list:ShoppingItem[];
	isLogged:boolean;
	loading:boolean;
	token:string;
	error:string;
	user:string;
}

export type {AppState};