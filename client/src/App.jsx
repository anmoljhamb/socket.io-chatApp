import "./App.scss";
import { useState } from "react";

function App() {
    const [username, setUsername] = useState("");

    const handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    };

    console.log(username);

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <h1>Enter Username</h1>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <button>Submit</button>
            </form>
        </>
    );
}

export default App;
