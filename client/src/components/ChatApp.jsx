import "./ChatApp.scss";
import React from "react";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { ServerMessage, UserMessage } from "./Message";

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
            <div className="chatApp">
                <div className="heading">
                    <h1>
                        Chatting As <span className="username">{username}</span>
                    </h1>
                </div>
                <div className="messages">
                    <ServerMessage />
                    <UserMessage />
                    <UserMessage />
                </div>
                <div className="sendMessage">
                    <form>
                        <input type="text" />
                        <button>Send</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChatApp;
