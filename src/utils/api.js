"use client";

import axios from "axios";

/* ---------------- Axios instance ---------------- */
const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "")}/api/dynamic/fetch`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // important if using cookies / sessions
});

/* ---------------- Request interceptor ---------------- */
api.interceptors.request.use(
    (config) => {
        // Client-side only
        if (typeof window === "undefined" || !config.url) {
            return config;
        }

        // Skip absolute URLs
        if (/^https?:\/\//i.test(config.url)) {
            return config;
        }

        const hostName = window.location.hostname;

        // Pass hostname to backend
        config.headers["X-Host-Name"] = hostName;

        // Use hostname or subdomain as tenant id
        const id = hostName; // or: hostName.split(".")[0]

        const normalizedUrl = config.url.startsWith("/")
            ? config.url
            : `/${config.url}`;

        // Prevent duplicate hostname prefix
        if (
            !normalizedUrl.startsWith(`/${id}/`) &&
            normalizedUrl !== `/${id}`
        ) {
            config.url = `/${id}${normalizedUrl}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/* ---------------- Response interceptor ---------------- */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            typeof window !== "undefined" &&
            error?.response?.status === 401
        ) {
            // Backend should clear auth cookies
            window.location.replace("/login");
        }

        return Promise.reject(error);
    }
);

export default api;
