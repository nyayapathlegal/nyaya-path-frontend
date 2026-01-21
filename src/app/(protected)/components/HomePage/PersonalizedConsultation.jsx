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

import { getPersonalizedConsultation } from "../../../../api/home/home.api";
import { setPersonalizedConsultation } from "../../../../api/client/client.api";

const PersonalizedConsultation = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    /* -------- Fetch -------- */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPersonalizedConsultation();
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
        setData(prev => ({ ...prev, [field]: value }));
    };

    /* -------- Validation -------- */
    const isValid = () => {
        return (
            data.tagline?.trim() &&
            data.heading?.trim() &&
            data.description?.trim()
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
            await setPersonalizedConsultation(data);
            toast.success("Consultation saved successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to save Consultation");
        } finally {
            setSaving(false);
        }
    };

    /* -------- States -------- */
    if (loading) return <HomePageLoader count={4} />;
    if (!data) return <CMSFallback message="No data found" />;

    /* -------- UI -------- */
    return (
        <div className="flex flex-col gap-y-4">
            <CMSSection title="Consultation Section">
                <CMSCard>

                    {/* Tagline */}
                    <CMSLabel labelText="Tagline" />
                    <CMSInput
                        value={data.tagline}
                        onChange={e => updateField("tagline", e.target.value)}
                    />

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

                </CMSCard>
            </CMSSection>

            <CMSButton
                onClick={saveData}
                loading={saving}
                label="Save Consultation"
                loadingLabel="Saving Consultation..."
            />
        </div>
    );
};

export default PersonalizedConsultation;