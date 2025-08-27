package main

import "fmt"

func main() {

	//Arrays are fixed length and initialized to default values if not provided with values
	
	var myArray [6]int
	
	fmt.Println("MyArray:",myArray)
	fmt.Println("MyArray length:",len(myArray))
	
	myArray[3] = 50
	
	fmt.Println("MyArray again:",myArray)
	
	myInitializedArray := [3]int{1,2,3}
	
	fmt.Println("My Initialized Array:",myInitializedArray)

	fmt.Println("------ Slices -------")
	
	var mySlice []int //Slices are dynamically allocated. Does not reserve memory here
	
	myAllocatedSlice := make([]int,10) //Allocate a slice of size 10
	
	fmt.Println("MySlice:",mySlice)
	fmt.Println("MySlice length:",len(mySlice))
	fmt.Println("My Allocated Slice:",myAllocatedSlice)
	fmt.Println("My Allocated Slice length:",len(myAllocatedSlice))
	
	//Adding new items to slices is done with append
	
	mySlice = append(mySlice,10)
	mySlice = append(mySlice,[]int{100,1000}...)
	fmt.Println("MySlice:",mySlice)
	fmt.Println("MySlice length:",len(mySlice))
	
	copiedSlice := make([]int,len(mySlice))
	copy(copiedSlice,mySlice)
	
	fmt.Println("Copied Slice",copiedSlice)
	
	partialSlice :=  mySlice[1:3]
	
	fmt.Println("Partial Slice",partialSlice)
	
	fmt.Println("--------- Maps -----------")
	
	//Map is a key value pair. Use make to create maps
	
	intStrMap := make(map[int]string)
	strIntMap := make(map[string]int)
	
	intStrMap[1] = "One"
	intStrMap[2] = "Two"
	
	strIntMap["One"] = 1
	strIntMap["Two"] = 2
	
	fmt.Println("IntStrMap:",intStrMap)
	fmt.Println("StrIntMap:",strIntMap)
	
	//Remove values and keys using delete
	
	delete(strIntMap,"Two")
	
	fmt.Println("StrIntMap again:",strIntMap)
	
	//Initial values on maps
	
	initialMap := map[int]string{1:"one",2:"two"}

	//Checking for keys and values in maps
	
	if val,ok := initialMap[2]; ok {
		fmt.Printf("Initialized map contains %s\n",val)
	}
	
	if _,ok := initialMap[3]; !ok {
		fmt.Printf("Initialized map does not contain that key or value\n")
	}
}