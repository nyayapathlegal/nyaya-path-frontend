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

import {
    getVoice,
} from "../../../../api/home/home.api";
import {
    setVoice,
} from "../../../../api/client/client.api";

const Voice = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    /* -------- Fetch -------- */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getVoice();
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

    /* -------- Update helper -------- */
    const updateField = (field, value) => {
        setData(prev => ({
            ...prev,
            voiceSection: {
                ...prev.voiceSection,
                [field]: value,
            },
        }));
    };

    /* -------- Validation -------- */
    const isValid = () => {
        const s = data.voiceSection;
        return (
            s.title?.trim() &&
            s.description?.trim() &&
            s.ctaText?.trim()
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
            await setVoice(data);
            toast.success("Voice Consultation saved");
        } 
        catch (err) {
            console.error(err);
            toast.error("Failed to save Voice Consultation");
        } 
        finally {
            setSaving(false);
        }
    };

    /* -------- States -------- */
    if (loading) return <HomePageLoader count={4} />;
    if (!data) return <CMSFallback message="No data found" />;

    /* -------- UI -------- */
    return (
        <div className="flex flex-col gap-y-4">
            <CMSSection title="Voice Consultation Section">
                <CMSCard>

                    {/* Title */}
                    <CMSLabel labelText="Title" />
                    <CMSInput
                        value={data.voiceSection.title}
                        onChange={e => updateField("title", e.target.value)}
                    />

                    {/* Description */}
                    <CMSLabel labelText="Description" />
                    <CMSTextarea
                        value={data.voiceSection.description}
                        onChange={e => updateField("description", e.target.value)}
                    />

                    {/* CTA Text */}
                    <CMSLabel labelText="CTA Text" />
                    <CMSInput
                        value={data.voiceSection.ctaText}
                        onChange={e => updateField("ctaText", e.target.value)}
                    />

                </CMSCard>
            </CMSSection>

            <CMSButton
                onClick={saveData}
                loading={saving}
                label="Save Voice"
                loadingLabel="Saving Voice..."
            />
        </div>
    );
};

export default Voice;
