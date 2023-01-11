const socket = io();

socket.on("alert", (message) => {
    console.log(message);
});
