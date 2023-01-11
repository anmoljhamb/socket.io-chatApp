const http = require("http");
const path = require("path");
const app = require("./app");

require("dotenv").config({
    path: path.join(__dirname, "config.env"),
});

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`The server is listening on *:${PORT}`);
});
