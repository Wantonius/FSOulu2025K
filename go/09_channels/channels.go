package main

import (
	"fmt"
	"time"
)

func synchro_worker(done chan bool) {
	fmt.Println("Worker: Let's do some work")
	time.Sleep(3*time.Second)
	fmt.Println("Worker: Done")
	fmt.Println("Worker: Sending a ping to main")
	done<-true
}

func worker(ch chan string, s time.Duration) {
	time.Sleep(s*time.Millisecond)
	ch <- "Worker done"
}


func main() {

	messages := make(chan string)

	//Creates a new channel. Channels are typed and both sender and receiver have to be present.
	
	go func(){
		time.Sleep(2*time.Second)
		fmt.Println("Pinger routine: Pinging");
		messages <- "Ping"
	}()
	fmt.Println("Main: Reading the channel")
	fmt.Println(<-messages)
	fmt.Println("Message read")
	
	time.Sleep(time.Second)
	
	fmt.Println("----- Buffered Channel -----")
	
	buffered := make(chan string,2)
	
	buffered <- "buffered "
	buffered <- "channel"
	
	fmt.Print(<-buffered)
	fmt.Println(<-buffered)

	fmt.Println("---- Channel Synchro -----")
	
	done := make(chan bool)
	go synchro_worker(done)
	fmt.Println("Main: Waiting for worker")
	<-done
	fmt.Println("Main: Worker done. Continue")
	
	fmt.Println("---- Multiple Channels ----")
	
	ch1 := make(chan string)
	ch2 := make(chan string)
	
	fmt.Println("Starting Workers")
	
	go worker(ch1,3500)
	go worker(ch2,6500)
	
	L:
	for {
		time.Sleep(time.Second)
		select {
			case v := <-ch1:
				fmt.Printf("Worker 1 done. Worker says %s\n",v)
			case v := <-ch2:
				fmt.Printf("Worker 2 done. Worker says %s\n",v)
				break L
			default:
				fmt.Println("No active channel. Waiting for workers")
		}
	}
	fmt.Println("Done. Exiting")
}