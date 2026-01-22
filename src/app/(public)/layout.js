"use client";
import { Footer, Header } from "@/components/Layouts";
import { usePathname } from "next/navigation";

export default function PublicLayout({ children }) {
    
    const pathname = usePathname();
    const showLayout  = !pathname.includes("login");
    
    return (
        <>
            {showLayout && <Header />}
                {children}
            {showLayout && <Footer />}
        </>
    );
}
