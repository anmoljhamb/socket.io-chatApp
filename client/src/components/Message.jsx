import React from "react";

const ServerMessage = ({ message }) => {
    return (
        <div className="message" server="true">
            <div className="content">{message}</div>
        </div>
    );
};

const UserMessage = ({ username, self, message }) => {
    return (
        <div className="message" self={self ? "true" : "false"}>
            <div className="meta">
                <div className="user">{username}</div>
                <div className="time">10:15</div>
            </div>
            <div className="content">{message}</div>
        </div>
    );
};

export { UserMessage, ServerMessage };
