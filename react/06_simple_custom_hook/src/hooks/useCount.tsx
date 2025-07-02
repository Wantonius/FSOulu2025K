import {useState} from 'react';

const useCount = (initialState = 0) => {
	
	const [count,setCount] = useState(initialState);
	

	const add = () => {
		setCount(count => count +1);
	}
	
	const subtract = () => {
		setCount(count => count -1);
	}
	
	return {count,add,subtract}
}


export default useCount;