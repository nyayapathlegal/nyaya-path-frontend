"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { userLogin } from "@/api/auth/auth.api";
import { useSelector } from "react-redux";

export default function LoginPage() {
    const router = useRouter();

    const isAuthenticated = useSelector(
        (state) => state.auth.isAuthenticated
    );

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [isAllowedScreen, setIsAllowedScreen] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/dashboard");
        }
    }, [isAuthenticated, router]);

    // Screen width check (min 1280px)
    useEffect(() => {
        const checkWidth = () => {
            setIsAllowedScreen(window.innerWidth >= 1280);
        };

        checkWidth();
        window.addEventListener("resize", checkWidth);

        return () => window.removeEventListener("resize", checkWidth);
    }, []);

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
        } catch (err) {
            const errorCode = err?.response?.data?.code;

            if (errorCode === "INVALID_CREDENTIALS") {
                toast.error("Invalid email or password");
                setForm((prev) => ({ ...prev, password: "" }));
                return;
            }

            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (isAuthenticated) return null;

    if (!isAllowedScreen) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-center px-4">
                <p className="text-zinc-400 text-sm">
                    This section is accessible only on a laptop or desktop.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-800">

                <h1 className="text-3xl font-semibold text-center text-white mb-6">
                    Login to your account
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="
                                w-full rounded-md border 
                                focus:border-blue-500/60 focus:outline-none
                                border-white/10 bg-[#1f1f1f] 
                                px-3 py-2 text-sm text-white
                            "
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="
                                w-full rounded-md border 
                                focus:border-blue-500/60 focus:outline-none
                                border-white/10 bg-[#1f1f1f] 
                                px-3 py-2 text-sm text-white
                            "
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full rounded-lg px-6 py-3
                            text-sm font-medium text-white
                            bg-blue-600 hover:bg-blue-700
                            disabled:cursor-not-allowed
                            transition-all duration-200
                            active:scale-[0.98]
                        "

                    >
                        {
                            loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"/>
                                    Logging in...
                                </span>
                            ) : (
                                "Log In"
                            )
                        }
                    </button>

                </form>
            </div>
        </div>
    );
}