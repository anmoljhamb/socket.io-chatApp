const socket = io();
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

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

socket.on("message", (message, user) => {
    displayMessage(message, user);
    chatMessages.scroll(0, chatMessages.scrollHeight);
});

function displayMessage(message, user) {
    const div = document.createElement("div");
    div.classList.add("message");

    div.innerHTML += `
        <p class="meta">${user.id} <span>9:12pm</span></p>
        <p class="text">
            ${message}
        </p>`;

    chatMessages.appendChild(div);
}
