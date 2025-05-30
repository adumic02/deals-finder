import React from "react";
import { toast, Toaster } from "sonner";

const Toast = () => {
    return <Toaster position="top-center" expand="true" richColors />;
};

export const notifyInfo = (message) =>
    toast.info(message, {
        style: {
            background: "#18181b",
            color: "#66fcf1",
            border: 0,
        },
    });

export const notifySuccess = (message) =>
    toast.success(message, {
        style: {
            background: "#18181b",
            color: "#17c964",
            border: 0,
        },
    });

export const notifyWarning = (message) =>
    toast.warning(message, {
        style: {
            background: "#18181b",
            color: "#f5a524",
            border: 0,
        },
    });

export const notifyError = (message) =>
    toast.error(message, {
        style: {
            background: "#18181b",
            color: "#f31260",
            border: 0,
        },
    });

export default Toast;
