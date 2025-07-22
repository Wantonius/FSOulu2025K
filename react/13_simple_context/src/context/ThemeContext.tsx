import React from 'react';
import {themes} from './themes';

export interface ThemeType {
	color:string;
	backgroundColor:string;
}


const ThemeContext = React.createContext<ThemeType>(themes.dark);

ThemeContext.displayName = "ThemeContext";

export default ThemeContext;