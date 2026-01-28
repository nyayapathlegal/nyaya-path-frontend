"use client"

import { useEffect, useState } from "react";
import { COUNTER_FALLBACK } from "@/config/fallbacks/homepageFallbacks";
import { getCounterSection } from "@/api/home/home.api";

const Counter = ({ end, label, duration = 1000 }) => {

    const [count, setCount] = useState(0);

    useEffect(() => {

        let start = 0;
        const increment = end / (duration / 30); // update every 30ms

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                start = end;
                clearInterval(timer);
            }
            setCount(Math.floor(start));
        }, 30);

        return () => clearInterval(timer);
    }, [end, duration]);

    return (
        <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-[10px] 
            sm:p-2
            lg:p-3 
            transition-transform duration-300 hover:scale-105
            "
        >
            <span className="text-2xl font-bold">{count}+</span>
            <span className="sm:text-[10px]  lg:text-[12px] uppercase tracking-wide">{label}</span>
        </div>
    );
};


const CounterSection = () => {

    const [data, setData] = useState(null);


    useEffect( () => {
        async function getCounterData() {
            try {
                const data = await getCounterSection();
                setData(data);
            }
            catch (error) {
                console.error("Error fetching Counter data:", error);
                setData(COUNTER_FALLBACK);
            }
        }
        getCounterData();
    }, []);

    return (
        <div
            className="
                hidden sm:flex
                absolute 
                left-1/2 -translate-x-1/2
                flex-row flex-wrap justify-center items-center
                w-full max-w-300 px-4 text-white

                /* SM */
                sm:bottom-2.5
                sm:gap-6

                /* MD */
                md:bottom-6
                md:gap-8

                /* LG */
                lg:bottom-15
                lg:gap-12
            "
        >

            {
                data?.counters?.map((counter) => (
                    <Counter
                        key={counter.label}
                        end={counter.end}
                        label={counter.label}
                    />
                ))
            }
        </div>
    )
}

export default CounterSection;