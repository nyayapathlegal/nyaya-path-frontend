"use client";

import axios from "axios";
import { store } from "@/redux/store";
import { login, logout } from "@/redux/features/authSlice";

/* ---------------- Axios instance ---------------- */
const authApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "")}/api/auth`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // required for HttpOnly cookies
});

/* ---------------- Response interceptor ---------------- */
authApi.interceptors.response.use(
    (response) => {
        const { data, config } = response;

        if (!config?.url) return response;

        /* -------- LOGIN -------- */
        // backend sets HttpOnly cookie
        if (config.url === "/login" && data?.user) {
            store.dispatch(
                login({
                    id: data.user.id,
                    username: data.user.username,
                    email: data.user.email,
                    fullName: data.user.fullName,
                    role: data.user.role,
                })
            );
        }

        /* -------- LOGOUT -------- */
        // backend clears cookie
        if (config.url === "/logout") {
            store.dispatch(logout());
        }

        return response;
    },
    (error) => {
        const status = error?.response?.status;

        /* -------- AUTH INVALID / EXPIRED -------- */
        if (status === 401) {
            store.dispatch(logout());
        }

        return Promise.reject(error);
    }
);

export default authApi;
