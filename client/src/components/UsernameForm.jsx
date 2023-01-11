import React from "react";

const UsernameForm = ({ username, setUsername, handleOnSubmit }) => {
    return (
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
    );
};

export default UsernameForm;
