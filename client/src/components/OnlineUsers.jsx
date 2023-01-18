import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

export function OnlineUsers({ users }) {
    const [showToggle, setShowToggle] = useState(false);

    const handleOnToggle = () => {
        setShowToggle((prev) => {
            return !prev;
        });
    };

    return (
        <div className="online" hide={showToggle ? "false" : "true"}>
            <p>
                Currently Online <span>{users.length}</span>
            </p>
            <span className="toogle" onClick={handleOnToggle}>
                <AiFillCaretDown />
            </span>

            <div className="users">
                {users.map(({ user }) => {
                    return (
                        <div className="user" key={user.id}>
                            <p>{user.username}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
