import "./App.scss";
import { useState } from "react";
import UsernameForm from "./components/UsernameForm";
import ChatApp from "./components/ChatApp";
import io from "socket.io-client";

function App() {
    const [formFilled, setFormFilled] = useState(false);
    const [username, setUsername] = useState("");
    const [server, setServer] = useState("localhost");
    const [port, setPort] = useState("8080");

    const socket = io(`http://${server}:${port}`, {
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
                    usernameState={[username, setUsername]}
                    serverState={[server, setServer]}
                    portState={[port, setPort]}
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
