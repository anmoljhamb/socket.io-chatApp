const socket = io();
const chatForm = document.getElementById("chat-form");

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const msg = event.target.elements.msg;
    socket.emit("message", msg.value);
    msg.value = "";
    msg.focus();
});

socket.on("alert", (message) => {
    console.log(message);
});

socket.on("message", (message) => {
    console.log(message);
});
