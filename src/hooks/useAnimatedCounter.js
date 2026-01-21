"use client";

import { useEffect, useRef, useState } from "react";

export function useAnimatedCounter(targetValue, options = {}) {
    
    const { duration = 1200, threshold = 0.5 } = options;

    const ref = useRef(null);
    const [start, setStart] = useState(false);
    const [count, setCount] = useState(0);

    /** Intersection Observer */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setStart(true);
                    } else {
                        setStart(false);
                        setCount(0); // reset when not visible
                    }
                });
            },
            { threshold }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, [threshold]);

    /** Count Animation */
    useEffect(() => {
        if (!start) return;

        const numericValue = Number(String(targetValue).replace(/[^0-9.-]/g, ""));
        if (isNaN(numericValue)) return;

        let startTS = null;

        const animate = (ts) => {
            if (!startTS) startTS = ts;

            const progress = Math.min((ts - startTS) / duration, 1);
            const currentValue = Math.floor(progress * numericValue);

            setCount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(numericValue);
            }
        };

        requestAnimationFrame(animate);
    }, [start, targetValue, duration]);

    return { ref, count };
}