import {List,ListItem,Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import useAction from '../hooks/useAction';
import useAppState from '../hooks/useAppState';

const Navbar = () => {
	
	const {error,isLogged,loading,user} = useAppState();
	const {logout} = useAction();
	
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
					<Link to="/" onClick={logout}><Typography variant="h6">Logout</Typography></Link>
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