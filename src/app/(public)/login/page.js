"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { userLogin } from "@/api/auth/auth.api";
import { useSelector } from "react-redux";

export default function LoginPage() {

    const router = useRouter();

    // Get auth state from Redux
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/dashboard");
        }
    }, [isAuthenticated, router]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {
            const data = await userLogin(form);

            if (!data?.token || !data?.refreshToken || !data?.user) {
                throw new Error("Invalid login response");
            }

            toast.success("Login successful");
            router.replace("/dashboard");
        }
        catch (err) {

            const errorCode = err?.response?.data?.code;

            if (errorCode === "INVALID_CREDENTIALS") {
                toast.error("Invalid email or password");
                setForm((prev) => ({ ...prev, password: "" }));
                return;
            }

            toast.error("Something went wrong. Try again.");
        }
        finally {
            setLoading(false);
        }
    };

    // Optional: show loader while redirecting
    if (isAuthenticated) return null;

    return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Login to your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email   
                </label>
                <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 transition-colors"
            >
                {loading ? "Logging in..." : "Log In"}
            </button>
        </form>
    </div>
</div>

    );
}
