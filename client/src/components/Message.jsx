import React from "react";

const ServerMessage = () => {
    return (
        <div className="message" server="true">
            <div className="content">Welcome to the chat!</div>
        </div>
    );
};

const UserMessage = () => {
    return (
        <div className="message" self="true">
            <div className="meta">
                <div className="user">Paul Singh</div>
                <div className="time">10:15</div>
            </div>
            <div className="content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
                cumque nemo animi neque officia assumenda obcaecati dolorum
                magni incidunt distinctio!
            </div>
        </div>
    );
};

export { UserMessage, ServerMessage };
