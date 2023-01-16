import React from "react";

const UsernameForm = ({
    usernameState,
    serverState,
    portState,
    handleOnSubmit,
}) => {
    const [username, setUsername] = usernameState;
    const [server, setServer] = serverState;
    const [port, setPort] = portState;

    return (
        <div className="userNameForm">
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
                    required
                />
                <div className="server">
                    <input
                        type="text"
                        name="server"
                        placeholder="Server"
                        value={server}
                        onChange={(e) => {
                            setServer(e.target.value);
                        }}
                        required
                    />
                    <input
                        min={0}
                        max={65536}
                        type="number"
                        name="port"
                        placeholder="Port"
                        value={port}
                        onChange={(e) => {
                            setPort(e.target.value);
                        }}
                        required
                    />
                </div>
                <button>Connect</button>
            </form>
        </div>
    );
};

export default UsernameForm;
