import React from 'react';
import type {AppState} from '../types/AppState';


const AppStateContext = React.createContext<AppState>({
	list:[],
	isLogged:false,
	token:"",
	loading:false,
	error:"",
	user:""
})

AppStateContext.displayName = "AppStateContext";

export default AppStateContext;