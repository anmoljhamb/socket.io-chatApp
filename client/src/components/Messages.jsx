import React from "react";
import { TypingMessage } from "./Message";
export function Messages({
    username,
    messagesRef,
    messages,
    typingUser,
    typing,
    handleOnSubmit,
    inputRef,
    handleOnKeyDown,
    handleOnKeyUp,
}) {
    return (
        <div className="chatApp">
            <div className="heading">
                <h1>
                    Chatting As <span className="username">{username}</span>
                </h1>
            </div>
            <div className="messages" ref={messagesRef}>
                {messages.map((message, index) => {
                    return (
                        <React.Fragment key={index}>{message}</React.Fragment>
                    );
                })}
                <TypingMessage user={typingUser} typing={typing} />
            </div>
            <div className="sendMessage">
                <form onSubmit={handleOnSubmit}>
                    <input
                        type="text"
                        ref={inputRef}
                        onKeyDown={handleOnKeyDown}
                        onKeyUp={handleOnKeyUp}
                        required
                    />
                    <button>Send</button>
                </form>
            </div>
        </div>
    );
}
