use std::fmt::Debug;

#[allow(unused)]
#[derive(Debug)]
struct Animal {
	name:String,
	age:u8,
}

#[allow(unused)]
struct Plant {
	size:u8,
	color:String,
}

fn print_item<T:Debug>(item:T) {
	println!("Here is your debug item {:?}",item);
}

#[allow(unused)]
fn main() {
	
	let charlie = Animal {
		name:"Charlie".to_string(),
		age:2,
	};
	
	let seymour = Plant {
		size:100,
		color:"Green".to_string(),
	};
	
	let number = 10;
	
	print_item(charlie);
	print_item(number);
	//print_item(seymour);
}


