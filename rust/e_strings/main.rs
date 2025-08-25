fn main() {

	//There are two different string types in Rust. String and light weight &string
	
	let name = "Bingo";
	let other_name = String::from("Adrian Tepes");
	println!("My name is {0} and this is my dog, {1}",other_name,name);
	
	//&str is a dynamic type and is dynamically sized. String is an owned type and it is sized.
	
	println!("A String is always {:?} bytes. It is Sized.",std::mem::size_of::<String>());
	println!("A &str can be anything {:?}. It is not Sized.",std::mem::size_of_val("Bingo"));

	let name = "Jim Bob";
	let country = "USA";
	let home = "Alabama";
	
	let together = format!("I am {} and I come from {}. I live in {}",name,country,home);
	
	println!("{}",together);

}