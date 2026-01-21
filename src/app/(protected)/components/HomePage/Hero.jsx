"use client";

import { useEffect, useState } from "react";
import CMSSection from "../CMS/CMSSection";
import CMSInput from "../CMS/CMSInput";
import CMSTextarea from "../CMS/CMSTextarea";
import CMSCard from "../CMS/CMSCard";
import CMSSubmitButton from "../CMS/CMSSubmitButton";
import CMSLabel from "../CMS/CMSLabel";
import CMSFallback from "../CMS/CMSFallback";
import { getHeroSection } from  "../../../../api/home/home.api";
import { setHeroSection } from "../../../../api/client/client.api";
import HomePageLoader from "../Loaders/HomePageLoader";
import toast from "react-hot-toast";


const HeroCMS = () => {

    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    /* -------- Fetch hero data -------- */
    useEffect(() => {
        const fetchHero = async () => {
            try {
                const data = await getHeroSection();
                setHero(data);
            } 
            catch (err) {
                console.error("Failed to fetch hero data", err);
                setHero(null);
            }
            finally {
                setLoading(false);
            }
        };

        fetchHero();
    }, []);

    /* -------- Update helper -------- */
    const updateField = (field, value) => {
        setHero(prev => ({ ...prev, [field]: value }));
    };

        // Valid fields
    const isValid = () => {
        
        if (!hero.title?.trim() || !hero.heading?.trim() || !hero.description?.trim()) {
            return false;
        }

        return true;

    };

    /* -------- Save -------- */
    const saveHero = async () => {

        if (!isValid()) {
            toast.error("All fields are required");
            return;
        }

        try {
            setSaving(true);
            await setHeroSection(hero);
            toast.success("Hero saved successfully");
        } 
        catch (err) {
            console.error("Failed to save Hero", err);
            toast.error("Failed to save Hero");
        } 
        finally {
            setSaving(false);
        }
    };

    /* -------- Loader -------- */
    if (loading) {
        return <HomePageLoader count={3} />
    }
    
    if (!hero) {
        return <CMSFallback message="No hero section found." />
    }


    return (
        <div className="flex flex-col gap-y-4">
            <CMSSection title="Hero Section">
                <CMSCard>
                    <CMSLabel labelText="Title" />
                    <CMSInput
                        value={hero.title}
                        onChange={e => updateField("title", e.target.value)}
                    />
                    <CMSLabel labelText="Heading" />
                    <CMSInput
                        value={hero.heading}
                        onChange={e => updateField("heading", e.target.value)}
                    />
                    <CMSLabel labelText="Description" />
                    <CMSTextarea
                        value={hero.description}
                        onChange={e => updateField("description", e.target.value)}
                    />
                </CMSCard>
            </CMSSection>

            <CMSSubmitButton
                onClick={saveHero}
                loading={saving}
                label="Save Hero"
                loadingLabel="Saving Hero..."
            />
        </div>
    );
};

export default HeroCMS;
