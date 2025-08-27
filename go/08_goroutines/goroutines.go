package main

import (
	"fmt"
	"time"
)

func hello() {
	fmt.Println("Hello from goroutine")
}

func numbers() {
	for i := 1;i <=5; i++ {
		time.Sleep(250*time.Millisecond)
		fmt.Printf("%d",i)
	}
	fmt.Printf("Numbers thread terminates")
}

func alphabets() {
	for i := 'a'; i <= 'e';i++ {
		time.Sleep(400*time.Millisecond)
		fmt.Printf("%c",i)
	}
	fmt.Printf("Alphabets thread terminates")
}

func main() {

	go hello()
	time.Sleep(1*time.Second)
	fmt.Println("Main moves on")

	go numbers()
	go alphabets()
	time.Sleep(3*time.Second)
	fmt.Printf("........ main ends")
}