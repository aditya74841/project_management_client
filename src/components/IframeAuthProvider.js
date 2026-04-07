"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExternalAuth, userProfile, handleLogout } from "@/redux/slices/authSlice";

const ALLOWED_ORIGINS = [
    "http://localhost:3001", // experimentclient
    "http://localhost:3000", // client itself
];

export const IframeAuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { isLoggedIn, accessToken, refreshToken } = useSelector((state) => state.auth);

    // 1. Listen for messages from Parent
    useEffect(() => {
        const handleMessage = async (event) => {
            if (!ALLOWED_ORIGINS.includes(event.origin)) return;

            const { type, payload } = event.data;

            // ── Normal features iframe handshake (parent → iframe) ──
            if (type === "AUTH_HANDSHAKE" && payload?.accessToken) {
                console.log("IframeAuthProvider: Received AUTH_HANDSHAKE");
                dispatch(setExternalAuth({
                    accessToken: payload.accessToken,
                    refreshToken: payload.refreshToken || "",
                }));
                try {
                    await dispatch(userProfile()).unwrap();
                } catch (error) {
                    console.error("IframeAuthProvider: Profile fetch failed", error);
                }
            }

            // ── Reverse handshake: parent asks "do you have a token?" ──
            // Used by experimentclient's hidden auth-check iframe
            if (type === "REQUEST_TOKEN") {
                console.log("IframeAuthProvider: Received REQUEST_TOKEN — replying with token status");
                if (isLoggedIn && accessToken) {
                    event.source.postMessage(
                        {
                            type: "TOKEN_RESPONSE",
                            payload: { accessToken, refreshToken: refreshToken || "" },
                        },
                        event.origin
                    );
                } else {
                    event.source.postMessage(
                        { type: "TOKEN_RESPONSE", payload: null },
                        event.origin
                    );
                }
            }

            if (type === "LOGOUT_HANDSHAKE") {
                console.log("IframeAuthProvider: Received LOGOUT_HANDSHAKE from host");
                dispatch(handleLogout());
            }

            if (type === "CREATE_FEATURE" && payload?.projectId) {
                console.log("IframeAuthProvider: Received CREATE_FEATURE request", payload);
            }
        };

        window.addEventListener("message", handleMessage);

        if (window.parent !== window) {
            window.parent.postMessage({ type: "IFRAME_READY" }, "*");
        }

        return () => window.removeEventListener("message", handleMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, isLoggedIn, accessToken, refreshToken]);

    // 2. Watch for local logout and broadcast to Parent
    useEffect(() => {
        if (!isLoggedIn && window.parent !== window) {
            console.log("IframeAuthProvider: Local logout detected, broadcasting to host");
            window.parent.postMessage({ type: "LOGOUT_BROADCAST" }, "*");
        }
    }, [isLoggedIn]);

    return <>{children}</>;
};
