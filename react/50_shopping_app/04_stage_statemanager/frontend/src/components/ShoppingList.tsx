import React,{useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import {Table,TableHead,TableBody,TableRow,TableCell,Box,Button,TextField} from '@mui/material';
import useAction from '../hooks/useAction';
import useAppState from '../hooks/useAppState';

interface State {
	removeIndex:number;
	editIndex:number;
}

interface SearchByType {
	type:string;
}

const ShoppingList = () => {
	
	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
	const [search,setSearch] = useState<SearchByType>({
		type:""
	})
	
	const {list,token} = useAppState();
	const {remove,edit,getList} = useAction();
	
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
		remove(id);
		changeMode(0,"cancel");
	}
	
	const editItem = (item:ShoppingItem) => {
		edit(item);
		changeMode(0,"cancel");
	}
	
	const searchByType = (event:React.SyntheticEvent) => {
		event.preventDefault();
		getList(token,search.type);
		setSearch({
			type:""
		})
	}
	
	const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setSearch({
			type:event.target.value
		})
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
	<>
		<Box component="form" onSubmit={searchByType} sx={{width:"20%",mx:"auto",textAlign:"center"}}>
			<TextField
				type="text"
				name="type"
				id="type"
				onChange={onChange}
				label="Search by type"
				value={search.type}/>
			<Button type="submit" variant="contained" color="secondary">Search</Button>
		</Box>
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
	</>
	)
}

export default ShoppingList;