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
    socket.emit("alert", "Welcome to the ChatApp");
    socket.broadcast.emit(
        "alert",
        `User with the id: ${socket.id} has joined the chat.`
    );

    socket.on("message", (message) => {
        console.log(message);
        // io.emit("message", message, { id: socket.id });
    });

    socket.on("disconnect", () => {
        io.emit("alert", `User with the id: ${socket.id} has left the chat.`);
    });

    socket.onAny((event, ...args) => {
        console.log(event, ...args);
    });
});

server.listen(PORT, () => {
    console.log(`The server is listening on *:${PORT}`);
});
