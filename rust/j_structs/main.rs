//In Rust there are two types of structs, tuple structs and normal c-like structs

#[derive(Debug)]
struct Color(u8,u8,u8);

struct SizeAndColor {
	size:u32,
	color:Color,
}

fn main() {
	
	let my_color = Color(50,0,200);
	
	let size_and_color = SizeAndColor{
		size:100,
		color:my_color
	};
	
	println!("Size is {} and color is {:?}",size_and_color.size,size_and_color.color);
}