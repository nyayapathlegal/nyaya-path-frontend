"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
    const router = useRouter();

    // Optional: allow "Enter" key to go home
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Enter") router.push("/");
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-lg text-center">
                {/* 404 */}
                <h1 className="text-[96px] font-extrabold text-white tracking-tight">
                    404
                </h1>

                {/* Subtitle */}
                <p className="mt-2 text-xl font-medium text-zinc-200">
                    Page not found
                </p>

                {/* Description */}
                <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                    The page you’re trying to access doesn’t exist or may have
                    been moved. Please check the URL or return to a safe page.
                </p>

                {/* Divider */}
                <div className="my-8 h-px w-full bg-zinc-800" />

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => router.push("/")}
                        className="
                            rounded-lg px-6 py-3
                            text-sm font-medium
                            bg-blue-600 text-white
                            border-2 border-blue-500
                            transition-all duration-200

                            hover:bg-blue-700
                            hover:border-blue-400
                            active:scale-[0.97]
                        "
                    >
                        Go to Home
                    </button>

                    <button
                        onClick={() => router.back()}
                        className="
                            rounded-lg px-6 py-3
                            text-sm font-medium
                            bg-[#1a1a1a] text-zinc-300
                            border-2 border-[#2a2a2a]
                            transition-all duration-200

                            hover:bg-[#222]
                            hover:text-white
                            active:scale-[0.97]
                        "
                    >
                        Go Back
                    </button>
                </div>

                {/* Hints */}
                <div className="mt-8 text-zinc-500 space-y-1">
                    <p>Press the <span className="text-zinc-300">Enter key</span> to go home</p>
                    <p>If this keeps happening, contact support.</p>
                </div>
            </div>
        </div>
    );
}