fn take_fifth(value:Vec<i32>) -> Option<i32> {
	if value.len() < 5 {
		None
	} else {
		Some(value[4])
	}
}

fn handle_option(my_option:Vec<Option<i32>>) {
	for item in my_option {
		match item {
			Some(number) => println!("Found a number {}",number),
			None => println!("Vector too short for value"),
		}
		
	}
}

fn check_if_five(number:i32) -> Result<i32,String> {
	match number {
		5 => Ok(number),
		_ => Err("Sorry, the number is not five".to_string()),
	}
}

fn main() {
	let new_vec = vec![1,2];
	let bigger_vec = vec![10,20,30,40,50];
	let biggest_vec = vec![100,200,300,400,500];
	let mut option_vec = Vec::new();
	
	option_vec.push(take_fifth(new_vec));
	option_vec.push(take_fifth(bigger_vec));
	option_vec.push(take_fifth(biggest_vec));
	
	handle_option(option_vec);

	let mut result_vec = Vec::new();
	
	for number in 2..7 {
		result_vec.push(check_if_five(number));
	}
	
	println!("{:?}",result_vec);
}