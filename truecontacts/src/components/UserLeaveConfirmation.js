import React from "react";
import { createRoot } from 'react-dom/client';
import { Confirm, TransitionablePortal } from "semantic-ui-react";

const UserLeaveConfirmation = (message, callback, confirmOpen, setConfirmOpen) => {
    const container = document.createElement("div");
    container.setAttribute('custom-confirm-view', "");
    const root = createRoot(container);

    const handleConfirm = (callbackState) => {
        //ReactDOM.unmountComponentAtNode(container);
        root.unmount();
        callback(callbackState);
        setConfirmOpen(false);
    };

    const handleCancel = (callbackState) => {
        //ReactDOM.unmountComponentAtNode(container);
        root.unmount();
        callback();
        setConfirmOpen(false);
    };

    document.body.appendChild(container);
    const {header, content} = JSON.parse(message);
    root.render(
        <TransitionablePortal open={confirmOpen} onClose={handleCancel}>
            <Confirm
                open={confirmOpen}
                header={header}
                onCancel={handleCancel}
                content={content}
                centered={false}
                onConfirm={handleConfirm}
            />
        </TransitionablePortal>
    );
};


export default UserLeaveConfirmation;