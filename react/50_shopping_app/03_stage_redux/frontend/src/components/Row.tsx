import {TableRow,TableCell,Button} from '@mui/material'
import ShoppingItem from '../models/ShoppingItem';

interface Props {
	item:ShoppingItem;
	index:number;
	changeMode(index:number,mode:string):void;
}

const Row = (props:Props) => {
	
	return(
		<TableRow>
			<TableCell>{props.item.type}</TableCell>
			<TableCell>{props.item.count}</TableCell>
			<TableCell>{props.item.price}</TableCell>
			<TableCell><Button onClick={() => props.changeMode(props.index,"remove")} color="error">Remove</Button></TableCell>
			<TableCell><Button onClick={() => props.changeMode(props.index,"edit")} color="primary">Edit</Button></TableCell>
		</TableRow>
	)
}

export default Row;