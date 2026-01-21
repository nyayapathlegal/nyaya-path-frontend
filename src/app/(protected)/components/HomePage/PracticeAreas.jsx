"use client";

import { useEffect, useState } from "react";
import CMSSection from "../CMS/CMSSection";
import CMSInput from "../CMS/CMSInput";
import CMSCard from "../CMS/CMSCard";
import CMSButton from "../CMS/CMSSubmitButton";
import CMSFallback from "../CMS/CMSFallback";
import HomePageLoader from "../Loaders/HomePageLoader";
import CMSLabel from "../CMS/CMSLabel";
import CMSTextarea from "../CMS/CMSTextarea";
import toast from "react-hot-toast";

import { getPracticeAreas } from "../../../../api/home/home.api";
import { setPracticeAreas } from "../../../../api/client/client.api";

const PracticeAreas = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    /* -------- Fetch -------- */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPracticeAreas();
                setData(res);
            } catch (err) {
                console.error(err);
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    /* -------- Update helpers -------- */
    const updateField = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const updateStepField = (index, field, value) => {
        setData(prev => {
            const steps = [...prev.steps];
            steps[index] = { ...steps[index], [field]: value };
            return { ...prev, steps };
        });
    };

    /* -------- Validation -------- */
    const isValid = () => {
        if (
            !data.heading?.trim() ||
            !data.description?.trim() ||
            !data.btnText?.trim()
        ) {
            return false;
        }

        return data.steps.every(step =>
            step.title?.trim() && step.description?.trim()
        );
    };

    /* -------- Save -------- */
    const saveData = async () => {
        if (!isValid()) {
            toast.error("All fields are required");
            return;
        }

        try {
            setSaving(true);
            await setPracticeAreas(data);
            toast.success("Practice Areas saved successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to save Practice Areas");
        } finally {
            setSaving(false);
        }
    };

    /* -------- States -------- */
    if (loading) return <HomePageLoader count={11} />;
    if (!data) return <CMSFallback message="No data found" />;

    /* -------- UI -------- */
    return (
        <div className="flex flex-col gap-y-4">
            <CMSSection title="Practice Areas Section">
                <CMSCard>

                    {/* Heading */}
                    <CMSLabel labelText="Heading" />
                    <CMSInput
                        value={data.heading}
                        onChange={e => updateField("heading", e.target.value)}
                    />

                    {/* Description */}
                    <CMSLabel labelText="Description" />
                    <CMSTextarea
                        value={data.description}
                        onChange={e => updateField("description", e.target.value)}
                    />

                    {/* Practice Areas (GRID) */}
                    <CMSLabel labelText="Practice Areas" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            data.steps.map((step, i) => (
                                <CMSCard
                                    key={step.id}
                                >
                                    <CMSLabel labelText={`Title ${i + 1}`} />
                                    <CMSInput
                                        value={step.title}
                                        onChange={e =>
                                            updateStepField(i, "title", e.target.value)
                                        }
                                    />

                                    <CMSLabel labelText="Description" />
                                    <CMSTextarea
                                        value={step.description}
                                        onChange={e =>
                                            updateStepField(i, "description", e.target.value)
                                        }
                                    />

                                </CMSCard>
                            ))
                        }
                    </div>

                    {/* Button Text */}
                    <CMSLabel labelText="Button Text" />
                    <CMSInput
                        value={data.btnText}
                        onChange={e => updateField("btnText", e.target.value)}
                    />

                </CMSCard>
            </CMSSection>

            <CMSButton
                onClick={saveData}
                loading={saving}
                label="Save Practice Areas"
                loadingLabel="Saving Practice Areas..."
            />
        </div>
    );
};

export default PracticeAreas;