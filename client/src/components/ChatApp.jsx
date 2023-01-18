import { Messages } from "./Messages";
import { OnlineUsers } from "./OnlineUsers";
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
    const [typing, setTyping] = useState(false);
    const isTyping = useRef(false);
    const [typingUser, setTypingUser] = useState("");

    useEffect(() => {
        console.log(`connected: ${connected}`);
        // socket.onAny((event, ...args) => {
        //     console.log(event, ...args);
        // });

        socket.on("users", (users) => {
            setUsers(users);
            // console.log(users);
        });

        socket.on("connect", () => {
            setConnected(true);
        });

        socket.on("disconnect", () => {
            setConnected(false);
            socket.connect();
        });

        socket.on("alert", (message) => {
            // console.log(message);
            setMessages((prev) => [
                ...prev,
                <ServerMessage message={message} />,
            ]);
        });

        socket.on("userMessage", (message) => {
            // console.log(message);
            setMessages((prev) => [
                ...prev,
                <UserMessage
                    self={message.meta.user.id === socket.id}
                    message={message}
                />,
            ]);
        });

        socket.on("typing", (typingUsers) => {
            let typingUsersMap = new Map(JSON.parse(typingUsers));
            typingUsersMap.delete(socket.id);

            console.log(typingUsersMap);

            if (typingUsersMap.size === 0) {
                setTypingUser("");
                setTyping(false);
            } else {
                let typingString = "";

                if (typingUsersMap.size === 1) {
                    const user = typingUsersMap.entries().next().value[1][
                        "username"
                    ];
                    typingString = `${user} is typing.`;
                } else {
                    const user = typingUsersMap.entries().next().value[1][
                        "username"
                    ];
                    typingString = `${user} and ${
                        typingUsersMap.size - 1
                    } other ${
                        typingUsersMap.size - 2 > 0 ? "users" : "user"
                    } are typing.`;
                }

                setTypingUser(typingString);
                setTyping(true);
            }
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("alert");
            socket.off("userMessage");
            socket.off("users");
            socket.off("typing");
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [messages]);

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [typing]);

    let checkIfTypingTimeout = null;

    const handleOnKeyUp = () => {
        isTyping.current = false;
        if (!checkIfTypingTimeout) {
            checkIfTypingTimeout = setTimeout(() => {
                if (!isTyping.current) {
                    // user hasn't clicked a key even after the 1.5s of pressesing the previous key. Must not be typing.
                    socket.emit("typingDone", { id: socket.id });
                }
            }, 1000);
        }
    };

    const handleOnKeyDown = () => {
        isTyping.current = true;
        if (checkIfTypingTimeout) {
            clearTimeout(checkIfTypingTimeout);
            checkIfTypingTimeout = null;
        }
        socket.emit("typing", { id: socket.id });
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        isTyping.current = false;
        if (checkIfTypingTimeout) {
            clearTimeout(checkIfTypingTimeout);
            checkIfTypingTimeout = null;
        }
        socket.emit("typingDone", { id: socket.id });
        console.log("onFormSubmit", socket);

        socket.emit("userMessage", inputRef.current.value);

        inputRef.current.value = "";
        inputRef.current.focus();
    };

    return (
        <>
            <Messages
                username={username}
                messagesRef={messagesRef}
                messages={messages}
                typingUser={typingUser}
                typing={typing}
                handleOnSubmit={handleOnSubmit}
                inputRef={inputRef}
                handleOnKeyDown={handleOnKeyDown}
                handleOnKeyUp={handleOnKeyUp}
            />
            <OnlineUsers users={users} />
        </>
    );
};

export default ChatApp;
