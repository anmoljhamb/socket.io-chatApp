import "./ChatApp.scss";
import React, { useMemo, useRef } from "react";
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
    const [messages, setMessages] = useState([]);
    const inputRef = useRef();

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

        socket.on("alert", (message) => {
            console.log(message);
            setMessages((prev) => [
                ...prev,
                <ServerMessage message={message} />,
            ]);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    });

    useEffect(() => {
        socket.connect();
        // eslint-disable-next-lineforEach
    }, []);

    const handleOnSubmit = (event) => {
        event.preventDefault();

        console.log("onFormSubmit", socket);

        socket.emit("userMessage", inputRef.current.value);

        inputRef.current.value = "";
        inputRef.current.focus();
    };

    return (
        <>
            <div className="chatApp">
                <div className="heading">
                    <h1>
                        Chatting As <span className="username">{username}</span>
                    </h1>
                </div>
                <div className="messages">
                    {messages.map((message, index) => {
                        return (
                            <React.Fragment key={index}>
                                {message}
                            </React.Fragment>
                        );
                    })}
                </div>
                <div className="sendMessage">
                    <form onSubmit={handleOnSubmit}>
                        <input type="text" ref={inputRef} />
                        <button>Send</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChatApp;
