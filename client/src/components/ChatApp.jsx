import React from "react";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const ChatApp = ({ username }) => {
    const socket = io("http://localhost:8080", {
        auth: {
            username,
        },
        autoConnect: false,
    });
    const [connected, setConnected] = useState(socket.connected);

    useEffect(() => {
        socket.onAny((event, ...args) => {
            console.log(event, ...args);
        });
        socket.on("connect", () => {
            setConnected(true);
        });

        socket.on("disconnect", () => {
            setConnected(false);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    });

    useEffect(() => {
        socket.connect();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <h1>Chatting App</h1>
            <p>For the user {username}</p>
            <h1>{connected ? "Connected" : "Not Connected"}</h1>
        </>
    );
};

export default ChatApp;
