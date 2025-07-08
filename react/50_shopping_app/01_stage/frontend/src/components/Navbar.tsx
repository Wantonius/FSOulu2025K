import {List,ListItem} from '@mui/material';
import {Link} from 'react-router-dom';

const Navbar = () => {
	return(
		<List sx={{display:"flex",flexDirection:"row"}}>
			<ListItem>
				<Link to="/">Shopping List</Link>
			</ListItem>
			<ListItem>
				<Link to="/form">Add new item</Link>
			</ListItem>
		</List>
	)
}

export default Navbar;