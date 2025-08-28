package main

import (
	"fmt"
	"net"
	"bufio"
	"os"
	"strings"
)

func main() {

	conn,err := net.Dial("tcp","localhost:5000")
	if err != nil {
		fmt.Println("Failed to connect to server. Error:",err.Error())
		return
	}
	
	reader := bufio.NewReader(os.Stdin)

	for {
		fmt.Print("Text to send (quit quits)")
		input,_ := reader.ReadString('\n')
		conn.Write([]byte(input))
		fmt.Printf("Message sent %s\n",input)
		if strings.TrimRight(input,"\r\n") == "quit" {
			conn.Close()
			return
		}
	}
}