import React,{useState} from 'react';
import {TableRow,TableCell,Button,TextField} from '@mui/material';
import ShoppingItem from '../models/ShoppingItem';

interface State {
	type:string;
	count:number;
	price:number;
}

interface Props {
	item:ShoppingItem;
	editItem(item:ShoppingItem):void;
	changeMode(index:number,mode:string):void;
}

const EditRow = (props:Props) => {
	
	const [state,setState] = useState<State>({
		type:props.item.type,
		count:props.item.count,
		price:props.item.price
	})

	const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}

	const editItem = () => {
		const item = new ShoppingItem(state.type,state.count,state.price,props.item.id);
		props.editItem(item);
	}
	
	return(
		<TableRow>
			<TableCell>
				<TextField
					type="text"
					name="type"
					id="type"
					onChange={onChange}
					value={state.type}/>
			</TableCell>
			<TableCell>
				<TextField
					type="number"
					name="count"
					id="count"
					onChange={onChange}
					value={state.count}/>
			</TableCell>
			<TableCell>
				<TextField
					type="number"
					name="price"
					id="price"
					onChange={onChange}
					value={state.price}/>
			</TableCell>
			<TableCell>
				<Button onClick={editItem} color="success">Save</Button>
			</TableCell>
			<TableCell>
				<Button onClick={() => props.changeMode(0,"cancel")} color="error">Cancel</Button>
			</TableCell>
		</TableRow>
	)
}

export default EditRow;