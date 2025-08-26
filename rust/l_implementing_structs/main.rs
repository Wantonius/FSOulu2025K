#[derive(Debug)]
struct Animal {
	age:u8,
	animal_type:AnimalType,
}

#[derive(Debug)]
enum AnimalType {
	Dog,
	Cat
}

impl Animal {
	//Implementations of have new function to create instances.
	
	fn new(age:u8,animal_type:AnimalType) -> Self {
		
		Self {
			age:age,
			animal_type:animal_type
		}
	}
	
	fn change_to_dog(&mut self) {
		println!("Changing to dog!");
		self.animal_type = AnimalType::Dog;
	}
	
	fn change_to_cat(&mut self) {
		println!("Changing to cat!");
		self.animal_type = AnimalType::Cat;
	}
	
	fn check_type(&self) {
		match self.animal_type {
			AnimalType::Dog => println!("This is a dog"),
			AnimalType::Cat => println!("This is a cat"),
		}
	}
}

fn main() {
	
	let mut new_animal = Animal::new(5,AnimalType::Cat);
	println!("This animal is {} years old",new_animal.age);
	
	new_animal.check_type();
	new_animal.change_to_dog();
	new_animal.check_type();
	new_animal.change_to_cat();
	new_animal.check_type();
}