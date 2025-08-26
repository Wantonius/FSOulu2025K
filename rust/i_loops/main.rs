fn main() {
	
	for number in 0..10 {
		println!("The number is {}",number);
	}
	
	for number in 0..=10 {
		println!("The number is {}",number);
	}
	
	let mut counter = 0;
	
	loop {
		counter += 1;
		println!("Counter value:{}",counter);
		if counter == 5 {
			break;
		}
	}
	
	//named loops
	
	let mut counter = 0;
	let mut counter2 = 0;
	
	'first_loop:loop {
		counter += 1;
		println!("Value of counter 1:{}",counter);
		if counter > 9 {
			println!("Entering inner loop");	
			loop {
				counter2 += 1;
				println!("Value of counter 2:{}",counter2);
				if counter2 == 3 {
					break 'first_loop;
				}
			}
		}
	}
	
	println!("After loops");
	
	let mut counter = 0;
	
	while counter < 5 {
		counter += 1;
		println!("Value of counter:{}",counter);
	}
}