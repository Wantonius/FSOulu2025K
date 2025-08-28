package main

import (
	"fmt"
	"net"
	"bufio"
	"os"
)

func main() {
	
	fmt.Println("Start server at port 5000")
	
	in,_ := net.Listen("tcp",":5000")
	fmt.Println("Waiting for connections")
	conn,_ := in.Accept()

	message,_ := bufio.NewReader(conn).ReadString('\n')
	fmt.Println("Message from client:",message)
	reader := bufio.NewReader(os.Stdin)
	fmt.Print("Message to client:")
	text,_ := reader.ReadString('\n')
	fmt.Fprintf(conn,text+"\n")
}