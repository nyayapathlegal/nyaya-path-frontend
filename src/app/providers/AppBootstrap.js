"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "@/redux/features/authSlice";
import { validateTokenAPI } from "@/api/auth/auth.api";

export default function AppBootstrap({ children }) {
    const [ready, setReady] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const bootstrapAuth = async () => {
            try {
                // Backend validates authToken cookie
                // const data = await validateTokenAPI(); 
                // console.log("Bootstrap auth data:", data);
                // API should read HttpOnly cookie internally

                // if (!data?.user) {
                //     dispatch(logout());
                //     setReady(true);
                //     return;
                // }

                // dispatch(
                //     login({
                //         id: data.user.id,
                //         username: data.user.username,
                //         email: data.user.email,
                //         fullName: data.user.fullName,
                //         role: data.user.role,
                //     })
                // );
                dispatch(logout());
            } catch {
                dispatch(logout());
            } finally {
                setReady(true);
            }
        };

        bootstrapAuth();
    }, [dispatch]);

    if (!ready) return null;

    return children;
}
