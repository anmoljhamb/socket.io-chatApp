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

const usersOnline = () => {
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            user: {
                id,
                username: socket.username,
            },
        });
    }

    io.emit("users", users);
};

io.on("connection", (socket) => {
    usersOnline();

    socket.emit("alert", "Welcome to the ChatApp.");
    socket.broadcast.emit("alert", `${socket.username} has joined the chat.`);

    socket.on("userMessage", (message) => {
        const date = new Date();
        io.emit("userMessage", {
            meta: {
                user: {
                    id: socket.id,
                    username: socket.username,
                },
                time: {
                    hours: date.toLocaleTimeString(),
                    date: date.toLocaleDateString(),
                },
            },
            content: message,
        });
    });

    socket.on("disconnect", () => {
        io.emit("alert", `${socket.username} has left the chat.`);
        usersOnline();
    });

    socket.on("typing", (id) => {
        socket.broadcast.emit("typing", {
            username: socket.username,
            id: socket.id,
        });
    });

    socket.on("typingDone", (id) => {
        socket.broadcast.emit("typingDone", {
            username: socket.username,
            id: socket.id,
        });
    });

    // socket.onAny((event, ...args) => {
    //     console.log(event, ...args);
    // });
});

server.listen(PORT, () => {
    console.log(`The server is listening on *:${PORT}`);
});
