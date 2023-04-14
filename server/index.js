const http = require("http");
const path = require("path");
const app = require("./app");
const { Server } = require("socket.io");

require("dotenv").config({
    path: path.join(__dirname, "config.env"),
});

const PORT = process.env.PORT || 8080;
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

const typingUsers = new Map();
const emitMap = (map) => JSON.stringify(Array.from(map));

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
        typingUsers.delete(socket.id);
        io.emit("typing", emitMap(typingUsers));
        io.emit("alert", `${socket.username} has left the chat.`);
        usersOnline();
    });

    socket.on("typing", ({ id }) => {
        typingUsers.set(id, { username: socket.username, id: socket.id });
        io.emit("typing", emitMap(typingUsers));
    });

    socket.on("typingDone", ({ id }) => {
        typingUsers.delete(id);
        io.emit("typing", emitMap(typingUsers));
    });

    // socket.onAny((event, ...args) => {
    //     console.log(event, ...args);
    // });
});

server.listen(PORT, () => {
    console.log(`The server is listening on *:${PORT}`);
});
