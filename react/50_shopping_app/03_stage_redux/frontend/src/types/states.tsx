import ShoppingItem from '../models/ShoppingItem';
import type {Reducer} from 'redux';

export interface LoginState {
	isLogged:boolean;
	loading:boolean;
	token:string;
	user:string;
	error:string;
}

export interface ShoppingState {
	list:ShoppingItem[];
	error:string;
}

export interface AppState {
	login:LoginState;
	shopping:ShoppingState;
}

export interface Action {
	type:string;
	payload?:ShoppingItem[] | string;
}

export interface RootReducer {
	login:Reducer<LoginState,Action>;
	shopping:Reducer<ShoppingState,Action>;
}