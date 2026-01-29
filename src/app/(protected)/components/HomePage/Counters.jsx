"use client";

import { useEffect, useState } from "react";

import CMSSection from "../CMS/CMSSection";
import CMSInput from "../CMS/CMSInput";
import CMSCard from "../CMS/CMSCard";
import CMSSubmitButton from "../CMS/CMSSubmitButton";
import CMSFallback from "../CMS/CMSFallback";
import HomePageLoader from "../Loaders/HomePageLoader";

import { getCounterSection } from "../../../../api/home/home.api";
import { setCounterSection } from "../../../../api/client/client.api";

import toast from "react-hot-toast";

const MAX_COUNTERS = 5;

const CountersCMS = () => {

    const [formData, setFormData] = useState({ counters: [] });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    /* -------- Fetch data -------- */
    useEffect(() => {
        async function fetchCounters() {
            try {
                const result = await getCounterSection();
                setFormData({counters: result?.counters || []});
            } 
            catch (error) {
                console.error(error);
                setFormData({ counters: [] });
            } 
            finally {
                setLoading(false);
            }
        }

        fetchCounters();
        
    }, []);

    /* -------- Update counter -------- */
    const updateCounter = (index, field, value) => {
        const updatedCounters = [...formData.counters];
        updatedCounters[index][field] =
            field === "end" ? Number(value) : value;

        setFormData({ counters: updatedCounters });
    };

    /* -------- Add counter -------- */
    const addCounter = () => {

        if (formData.counters.length >= MAX_COUNTERS) {
            return;
        }

        setFormData({
            counters: [...formData.counters, { label: "", end: 0 }],
        });
    };

    /* -------- Remove counter -------- */
    const removeCounter = (index) => {
        const updatedCounters = formData.counters.filter(
            (_, i) => {
                return i !== index
            }
        );

        setFormData({ counters: updatedCounters });
    };

    /* -------- Save -------- */
    const saveCounters = async () => {
        // simple validation
        const invalid = formData.counters.some(
            c => !c.label.trim()
        );

        if (invalid) {
            toast.error("All fields are required");
            return;
        }

        try {
            setSaving(true);
            await setCounterSection(formData);
            toast.success("Counters saved successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to save counters");
        } finally {
            setSaving(false);
        }
    };

    /* -------- Render -------- */
    if (loading) return <HomePageLoader count={4} />;

    if (!formData.counters.length) {
        return <CMSFallback message="No counters found." />;
    }

    return (
        <div className="flex flex-col gap-y-4">
            <CMSSection title="Counters Section">
                {
                    formData.counters.map((counter, i) => (
                    <CMSCard key={i}>
                        <div className="flex gap-2">
                            <CMSInput
                                value={counter.label}
                                onChange={(e) =>
                                    updateCounter(i, "label", e.target.value)
                                }
                               
                            />

                            <CMSInput
                                type="number"
                                value={counter.end}
                                onChange={(e) =>
                                    updateCounter(i, "end", e.target.value)
                                }
                               
                            />

                            <button
                                type="button"
                                onClick={() => removeCounter(i)}
                                className="px-2 text-red-500 text-sm hover:text-red-400"
                            >
                                Remove
                            </button>
                        </div>
                    </CMSCard>
                    ))
                }

                {
                    formData.counters.length < MAX_COUNTERS && (
                        <button
                            type="button"
                            onClick={addCounter}
                            className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
                        >
                            + Add Counter
                        </button>
                    )
                }
            </CMSSection>

            <CMSSubmitButton
                onClick={saveCounters}
                loading={saving}
                label="Save Counters"
                loadingLabel="Saving Counters..."
            />
        </div>
    );
};

export default CountersCMS;
