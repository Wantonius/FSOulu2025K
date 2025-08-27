package main

import "fmt"

type dog struct {
	name,breed string
}

type cat struct {
	name,breed string
}

//Interfaces are implemented by structs by implementing the interface functions separately

type animal interface {
	move()
	speak()
}

//Functions are tied to structs using receiver types. These types appear in the function as (d dog) or (c cat). Implementing interface functions this way ties the struct to the interface

func (d dog) move() {
	fmt.Printf("%s runs. See %s run.\n",d.name,d.name)
}

func (d dog) speak() {
	fmt.Printf("%s barks. %s is a %s.\n",d.name,d.name,d.breed)
}

func (c cat) move() {
	fmt.Printf("%s sneaks\n",c.name)
}

func (c cat) speak() {
	fmt.Printf("%s meows. %s is a %s.\n",c.name,c.name,c.breed)
}

func act(a animal) {
	a.move()
	a.speak()
}

func main() {

	duke := dog{name:"Duke",breed:"Sitter"}
	whiskers := cat{name:"Whiskers",breed:"Persian"}
	
	//Access directly through the struct methods
	
	duke.move()
	duke.speak()
	
	whiskers.move()
	whiskers.speak()
	
	//Access through the interface
	
	act(duke)
	act(whiskers)
}
