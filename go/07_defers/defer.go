package main

import "fmt"

func willExecuteLast(greet string) {
	fmt.Printf("Goodbye %s. I was deferred last in the calling function\n",greet)
}

func callsAdditionaldefer(greet string) {
	defer willExecuteLast(greet)
	fmt.Printf("I will execute before first goodbye\n")
}

func helloGreeting(greet string) {
	fmt.Printf("Hello %s. I will execute first\n",greet)
}

func panics() {
	panic("Calamity ensues!")
}

func main() {

	defer func() {
		if r := recover(); r != nil {
			fmt.Printf("It panicked but we recovered. Error:%s\n",r)
		}
	}()
	
	defer panics()

	defer willExecuteLast("John")
	defer callsAdditionaldefer("Johnny")
	
	fmt.Println("First we test defer")
	helloGreeting("John")
}