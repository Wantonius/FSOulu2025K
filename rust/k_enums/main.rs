enum ThingsInTheSky {
	Sun,
	Stars
}

fn create_skystate(time:u32) -> ThingsInTheSky {
	match time {
		6..=18 => ThingsInTheSky::Sun,
		_ => ThingsInTheSky::Stars,
	}
}

fn check_skystate(state:&ThingsInTheSky) {
	match state {
		ThingsInTheSky::Sun => println!("I see the sun"),
		ThingsInTheSky::Stars => println!("I see the stars"),
	}
}

fn main() {
	
	let time = 8;
	let skystate = create_skystate(time);
	check_skystate(&skystate);
	
	let time = 22;
	let skystate = create_skystate(time);
	check_skystate(&skystate);
}