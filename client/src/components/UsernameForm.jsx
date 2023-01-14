import React from "react";

const UsernameForm = ({ username, setUsername, handleOnSubmit }) => {
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
                <button>Submit</button>
            </form>
        </div>
    );
};

export default UsernameForm;
