fn print_country(country_name:String) {
	println!("{}",country_name);
}

fn print_country_returns_country(country_name:String) -> String {
	println!("{}",country_name);
	country_name
}

fn print_country_using_reference(country_name:&String) {
	println!("{}",country_name);
}

fn add_country(country_name:&mut String) {
	country_name.push_str("-Sweden");
	println!("{}",country_name);
}

fn main() {
	
	let country = String::from("Finland");
	print_country(country);
	//print_country(country);

	//In Rust ownership of a variable is moved to the function if parameter is not a reference.
	//The variable cannot be then used in the original function
	
	let country = String::from("Finland");
	let country = print_country_returns_country(country);
	print_country_returns_country(country);

	//Borrowing or passing a reference does not change ownership. Usually functions use references
	
	let country = String::from("Finland");
	print_country_using_reference(&country);
	print_country_using_reference(&country);

	//Mutable reference
	
	let mut country = String::from("Finland");
	add_country(&mut country);
}