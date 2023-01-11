import "./App.scss";
import { useState } from "react";
import UsernameForm from "./components/UsernameForm";
import io from "socket.io-client";
import { useEffect } from "react";

function App() {
    const socket = io("http://localhost:8080", { autoConnect: false });
    const [username, setUsername] = useState("");

    useEffect(() => {
        socket.onAny((event, ...args) => {
            console.log(event, ...args);
        });
    });

    const handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(event);
        socket.auth = { username: event.target.elements.username.value };
        socket.connect();
    };

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

export default App;
