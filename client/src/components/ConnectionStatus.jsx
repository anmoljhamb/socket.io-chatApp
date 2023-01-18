import React from "react";
export function ConnectionStatus({ connected }) {
    return (
        <div className="connected">
            <h1>
                Connection Status:{" "}
                {connected && <span className="connected">Connected</span>}
                {!connected && (
                    <span className="notConnected">Not Connected</span>
                )}
            </h1>
            {!connected && <p>Connecting to the server ...</p>}
        </div>
    );
}
