const http = require("http");
const path = require("path");
const app = require("./app");
const { Server } = require("socket.io");

require("dotenv").config({
    path: path.join(__dirname, "config.env"),
});

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    console.log(`New User Connected with id: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`User with id ${socket.id} disconnected.`);
    });
});

server.listen(PORT, () => {
    console.log(`The server is listening on *:${PORT}`);
});
