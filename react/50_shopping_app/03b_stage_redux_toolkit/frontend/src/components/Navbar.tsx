import {List,ListItem,Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {logout} from '../store/loginSlice';
import type {AppState} from '../types/states';
import type {ThunkDispatch,PayloadAction} from '@reduxjs/toolkit';
import {useDispatch,useSelector} from 'react-redux';

const Navbar = () => {
	
	const dispatch:ThunkDispatch<any,any,PayloadAction> = useDispatch();
	
	const stateSelector = (state:AppState) => {
		let error = state.shopping.error;
		if(state.login.error) {
			error = state.login.error;
		}
		return {
			isLogged:state.login.isLogged,
			user:state.login.user,
			token:state.login.token,
			loading:state.login.loading,
			error:error
		}
	}
	
	const {isLogged,user,token,loading,error} = useSelector(stateSelector);
	
	let message = " ";
	if(loading) {
		message = "Loading..."
	}
	if(error) {
		message = error;
	}
	if(isLogged) {
		return(
			<List sx={{display:"flex",flexDirection:"row"}}>
				<ListItem>
					<Typography variant="h6">Shopping App</Typography>
				</ListItem>
				<ListItem>
					<Link to="/"><Typography variant="h6">Shopping List</Typography></Link>
				</ListItem>
				<ListItem>
					<Link to="/form"><Typography variant="h6">Add new item</Typography></Link>
				</ListItem>
				<ListItem>
					<Typography variant="h6">Logged in as {user}</Typography>
				</ListItem>
				<ListItem>
					<Link to="/" onClick={() => dispatch(logout({"message":"","token":token}))}><Typography variant="h6">Logout</Typography></Link>
				</ListItem>
				<ListItem>
					<Typography variant="h6">{message}</Typography>
				</ListItem>
			</List>
		)
	} else {
		return(
			<List sx={{display:"flex",flexDirection:"row"}}>
				<ListItem>
					<Typography variant="h6">Shopping App</Typography>
				</ListItem>
				<ListItem>
					<Typography variant="h6">{message}</Typography>
				</ListItem>
			</List>
		)		
	}
}

export default Navbar;