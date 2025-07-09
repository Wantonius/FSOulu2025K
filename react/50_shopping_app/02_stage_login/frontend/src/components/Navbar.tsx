import {List,ListItem,Typography} from '@mui/material';
import {Link} from 'react-router-dom';

interface Props {
	isLogged:boolean;
	loading:boolean;
	error:string;
	user:string;
	logout():void;
}

const Navbar = (props:Props) => {
	
	let message = " ";
	if(props.loading) {
		message = "Loading..."
	}
	if(props.error) {
		message = props.error;
	}
	if(props.isLogged) {
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
					<Typography variant="h6">Logged in as {props.user}</Typography>
				</ListItem>
				<ListItem>
					<Link to="/" onClick={props.logout}><Typography variant="h6">Logout</Typography></Link>
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