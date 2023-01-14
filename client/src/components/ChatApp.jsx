import "./ChatApp.scss";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { ServerMessage, UserMessage } from "./Message";

const ChatApp = ({ socket, username }) => {
    socket.connect();

    const [users, setUsers] = useState([]);
    const [connected, setConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);
    const inputRef = useRef();
    const messagesRef = useRef();

    useEffect(() => {
        // socket.onAny((event, ...args) => {
        //     console.log(event, ...args);
        // });

        socket.on("users", (users) => {
            setUsers(users);
        });

        socket.on("connect", () => {
            setConnected(true);
        });

        socket.on("disconnect", () => {
            setConnected(false);
            // socket.connect();
        });

        socket.on("alert", (message) => {
            console.log(message);
            setMessages((prev) => [
                ...prev,
                <ServerMessage message={message} />,
            ]);
        });

        socket.on("userMessage", (message) => {
            console.log(message);
            setMessages((prev) => [
                ...prev,
                <UserMessage
                    self={message.meta.user.id === socket.id}
                    message={message}
                />,
            ]);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("alert");
            socket.off("userMessage");
            socket.off("users");
        };
    }, []);

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [messages]);

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
                <div className="messages" ref={messagesRef}>
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
            <div className="online">
                <p>
                    Currently Online <span>{users.length}</span>
                </p>
            </div>
        </>
    );
};

export default ChatApp;
