import "./ChatApp.scss";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { ServerMessage, TypingMessage, UserMessage } from "./Message";
import { AiFillCaretDown } from "react-icons/ai";

const ChatApp = ({ socket, username }) => {
    socket.connect();

    const [users, setUsers] = useState([]);
    const [connected, setConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);
    const inputRef = useRef();
    const messagesRef = useRef();
    const [showToggle, setShowToggle] = useState(false);
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

            if (typingUsersMap.size > 0) {
                setTypingUser("somebody");
                setTyping(true);
            }

            if (typingUsersMap.size === 0) {
                setTypingUser("");
                setTyping(false);
            }
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("alert");
            socket.off("userMessage");
            socket.off("users");
            socket.off("typing");
            socket.off("typingDone");
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [messages]);

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        console.log("useEffect on isTyping");
    }, [typing]);

    const handleOnToggle = () => {
        setShowToggle((prev) => {
            return !prev;
        });
    };

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
                    <TypingMessage user={typingUser} typing={typing} />
                </div>
                <div className="sendMessage">
                    <form onSubmit={handleOnSubmit}>
                        <input
                            type="text"
                            ref={inputRef}
                            onKeyDown={handleOnKeyDown}
                            onKeyUp={handleOnKeyUp}
                        />
                        <button>Send</button>
                    </form>
                </div>
            </div>
            <div className="online" hide={showToggle ? "false" : "true"}>
                <p>
                    Currently Online <span>{users.length}</span>
                </p>
                <span className="toogle" onClick={handleOnToggle}>
                    <AiFillCaretDown />
                </span>

                <div className="users">
                    {users.map(({ user }) => {
                        return (
                            <div className="user" key={user.id}>
                                <p>{user.username}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ChatApp;
