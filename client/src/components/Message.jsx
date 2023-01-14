import React from "react";

const ServerMessage = ({ message }) => {
    return (
        <div className="message" server="true">
            <div className="content">{message}</div>
        </div>
    );
};

const UserMessage = ({ message, self }) => {
    const time = message.meta.time;
    return (
        <div className="message" self={self ? "true" : "false"}>
            <div className="meta">
                <div className="user">{message.meta.user.username}</div>
                <div className="time">{`${time.hours}, ${time.date}`}</div>
            </div>
            <div className="content">{message.content}</div>
        </div>
    );
};

export { UserMessage, ServerMessage };
