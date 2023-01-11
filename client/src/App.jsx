import "./App.scss";
import { useState } from "react";
import UsernameForm from "./components/UsernameForm";

function App() {
    const [username, setUsername] = useState("");

    const handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(event);
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
