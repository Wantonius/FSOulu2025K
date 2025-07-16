import {useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import {Table,TableHead,TableBody,TableRow,TableCell} from '@mui/material';
import {remove,edit} from '../actions/shoppingActions';
import type {AppState,Action} from '../types/states';
import type {ThunkDispatch} from 'redux-thunk';
import {useDispatch,useSelector} from 'react-redux';

interface State {
	removeIndex:number;
	editIndex:number;
}


const ShoppingList = () => {
	
	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
	const dispatch:ThunkDispatch<any,any,Action> = useDispatch();
	
	const stateSelector = (state:AppState) => {
		return {
			token:state.login.token,
			list:state.shopping.list
		}
	}
	
	const {token,list} = useSelector(stateSelector);
	
	const changeMode = (index:number,mode:string) => {
		switch(mode) {
			case "remove": {
				setState({
					removeIndex:index,
					editIndex:-1
				})
				return;
			}
			case "edit": {
				setState({
					removeIndex:-1,
					editIndex:index
				})
				return;
			}
			case "cancel":{
				setState({
					removeIndex:-1,
					editIndex:-1
				})
				return;
			}
			default:
				return
		}
	}
	
	const removeItem = (id:string) => {
		dispatch(remove(token,id));
		changeMode(0,"cancel");
	}
	
	const editItem = (item:ShoppingItem) => {
		dispatch(edit(token,item));
		changeMode(0,"cancel");
	}
	
	const shoppingItems = list.map((item,index) => {
		if(state.removeIndex === index) {
			return(
				<RemoveRow key={item.id} item={item} changeMode={changeMode} removeItem={removeItem}/>
			)
		}
		if(state.editIndex === index) {
			return (
				<EditRow key={item.id} item={item} changeMode={changeMode} editItem={editItem}/>
			)
		}
		return(
			<Row key={item.id} index={index} item={item} changeMode={changeMode}/>
		)
	})
	
	return(
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>Type</TableCell>
					<TableCell>Count</TableCell>
					<TableCell>Price</TableCell>
					<TableCell>Remove</TableCell>
					<TableCell>Edit</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
			{shoppingItems}
			</TableBody>
		</Table>
	)
}

export default ShoppingList;