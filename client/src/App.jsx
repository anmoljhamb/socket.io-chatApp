import "./App.scss";
import { useState } from "react";
import UsernameForm from "./components/UsernameForm";
import ChatApp from "./components/ChatApp";

function App() {
    const [formFilled, setFormFilled] = useState(false);
    const [username, setUsername] = useState("");

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
            <ChatApp username={username} />
        </>
    );
}

export default App;
