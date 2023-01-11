const http = require("http");
const path = require("path");
const app = require("./app");
const { Server } = require("socket.io");

require("dotenv").config({
    path: path.join(__dirname, "config.env"),
});

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, { cors: "*" });

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error("Invalid username"));
    }
    socket.username = username;
    next();
});

io.on("connection", (socket) => {
    console.log(`${socket.username} has joined the chat.`);

    socket.emit("alert", "Welcome to the ChatApp");
    socket.broadcast.emit("alert", `${socket.username} has joined the chat.`);

    socket.on("message", (message) => {
        console.log(message);
        // io.emit("message", message, { username: socket.username });
    });

    socket.on("disconnect", () => {
        io.emit("alert", `${socket.username} has left the chat.`);
    });

    socket.onAny((event, ...args) => {
        console.log(event, ...args);
    });
});

server.listen(PORT, () => {
    console.log(`The server is listening on *:${PORT}`);
});
