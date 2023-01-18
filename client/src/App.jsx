import "./App.scss";
import { useState } from "react";
import UsernameForm from "./components/UsernameForm";
import ChatApp from "./components/ChatApp";
import io from "socket.io-client";
import { useEffect } from "react";

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
        reconnection: true,
        reconnectionDelay: 500,
    });

    useEffect(() => {
        const currentUrl = window.location.href;
        const exp = new RegExp(/https?:\/\/([a-zA-Z0-9.]+):[0-9]+/);
        setServer(exp.exec(currentUrl)[1]);
        /**
         * for example, the local ip address is 10.7.13.225, the client will be hosted on the url http://10.7.13.225:3000, so the regex will automatically get the 10.7.13.225 from the given url.
         */
    }, []);

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
