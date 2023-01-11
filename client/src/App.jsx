import "./App.scss";
import { useState } from "react";
import UsernameForm from "./components/UsernameForm";
import ChatApp from "./components/ChatApp";
import io from "socket.io-client";
import { useEffect } from "react";

function App() {
    const socket = io("http://localhost:8080", { autoConnect: false });
    const [connected, setConnected] = useState(socket.connected);
    const [username, setUsername] = useState("");

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

    const handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(event);
        socket.auth = { username: event.target.elements.username.value };
        socket.connect();
    };

    if (!connected) {
        return (
            <>
                <UsernameForm
                    username={username}
                    setUsername={setUsername}
                    handleOnSubmit={handleOnSubmit}
                />
            </>
        );
    }
    return (
        <>
            <ChatApp socket={socket}></ChatApp>
        </>
    );
}

export default App;
