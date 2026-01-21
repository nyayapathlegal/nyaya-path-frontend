"use client";

import axios from "axios";
import { store } from "@/redux/store";
import { logout } from "@/redux/features/authSlice";

const clientApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dynamic/update`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // ✅ REQUIRED for HttpOnly cookies
});

/* ---------------- Request interceptor ---------------- */
clientApi.interceptors.request.use(
    (config) => {
         /* ---------------- Hostname logic ---------------- */
        if (typeof window !== "undefined") {
            const hostName = window.location.hostname;

            // optional but useful for backend
            config.headers["X-Host-Name"] = hostName;

            const id = hostName;

            if (id && config.url) {
                const normalizedUrl = config.url.startsWith("/")
                    ? config.url
                    : `/${config.url}`;

                // prevent duplicate hostname
                if (
                    !normalizedUrl.startsWith(`/${id}/`) &&
                    normalizedUrl !== `/${id}`
                ) {
                    config.url = `/${id}${normalizedUrl}`;
                }
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/* ---------------- Response interceptor ---------------- */
clientApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            try {
                // optional: try refresh endpoint first
                await clientApi.post("/auth/refresh");
                return clientApi(error.config);
            } catch {
                // refresh failed → logout
                store.dispatch(logout());
                window.location.replace("/login");
            }
        }

        return Promise.reject(error);
    }
);

export default clientApi;
