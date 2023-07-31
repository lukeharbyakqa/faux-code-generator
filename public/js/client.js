const socket = io("ws://localhost:3000");

socket.on("hello", (arg) => {
  console.log(arg);
});

socket.emit("customMessage", "hello you!");
