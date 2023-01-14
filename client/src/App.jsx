import "./App.scss";
import { useState } from "react";
import UsernameForm from "./components/UsernameForm";
import ChatApp from "./components/ChatApp";
import io from "socket.io-client";

function App() {
    const [formFilled, setFormFilled] = useState(false);
    const [username, setUsername] = useState("");

    const socket = io("http://localhost:8080", {
        auth: {
            username,
        },
        autoConnect: false,
    });

    const handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(event);

        setFormFilled(true);
    };

    if (!formFilled) {
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
            <ChatApp socket={socket} username={username} />
        </>
    );
}

export default App;
