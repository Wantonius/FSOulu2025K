import {List,ListItem} from '@mui/material';
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
					Shopping App
				</ListItem>
				<ListItem>
					<Link to="/">Shopping List</Link>
				</ListItem>
				<ListItem>
					<Link to="/form">Add new item</Link>
				</ListItem>
				<ListItem>
					Logged in as {props.user}
				</ListItem>
				<ListItem>
					<Link to="/" onClick={props.logout}>Logout</Link>
				</ListItem>
				<ListItem>
					{message}
				</ListItem>
			</List>
		)
	} else {
		return(
			<List sx={{display:"flex",flexDirection:"row"}}>
				<ListItem>
					Shopping App
				</ListItem>
				<ListItem>
					{message}
				</ListItem>
			</List>
		)		
	}
}

export default Navbar;