package main

import	(
	"fmt"
	"bufio"
	"net"
)

func handleConnection(conn net.Conn) {
	
	var stringbuffer string
	for stringbuffer != "quit" {
		buffer,err := bufio.NewReader(conn).ReadBytes('\n')
		if err != nil {
			fmt.Printf("%s left\n",conn.RemoteAddr().String())
			conn.Close()
			return
		}		
		stringbuffer = string(buffer[:len(buffer)-1])
		fmt.Printf("%s says %s\n",conn.RemoteAddr().String(),stringbuffer)
	}
	conn.Close()
}

func main() {
	fmt.Println("Accepting connections at 5000")
	l,err := net.Listen("tcp",":5000")
	if err != nil {
		fmt.Println("Failed to create listening socket. Error:",err.Error())
		return
	}
	defer l.Close()
	
	for {
		c,err := l.Accept()
		if err != nil {
			fmt.Println("Error in accepting connection. Error:",err.Error())
			continue
		}
		fmt.Println("Client "+c.RemoteAddr().String()+" connected")
		go handleConnection(c)
	}
}