import React from "react";

const ChatApp = ({ socket }) => {
    console.log(socket);

    return (
        <>
            <h1>Chatting App</h1>
            <p>For the user {socket.username}</p>
        </>
    );
};

export default ChatApp;
