"use client";

import { useEffect, useState } from "react";
import CMSSection from "../CMS/CMSSection";
import CMSInput from "../CMS/CMSInput";
import CMSCard from "../CMS/CMSCard";
import CMSButton from "../CMS/CMSSubmitButton";
import HomePageLoader from "../Loaders/HomePageLoader";
import CMSLabel from "../CMS/CMSLabel";
import toast from "react-hot-toast";
import { setMediaSection } from "@/api/client/client.api";
import { getMediaSection } from "@/api/home/home.api";

const MediaSectionCMS = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    /* -------- Fetch -------- */

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMediaSection();
                setData(data);
            } 
            catch (err) {
                console.error(err);
                setData(null);
            } 
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    /* -------- Update helpers -------- */
    const updateImageField = (field, value) => {
        setData(prev => ({
            ...prev,
            images: {
                ...prev.images,
                [field]: value,
            },
        }));
    };

    const updateGuidanceImage = (index, value) => {
        setData(prev => {
            const updated = [...prev.images.guidanceSection];
            updated[index] = value;

            return {
                ...prev,
                images: {
                    ...prev.images,
                    guidanceSection: updated,
                },
            };
        });
    };

    const updateVideoField = (field, value) => {
        setData(prev => ({
            ...prev,
            videos: {
                ...prev.videos,
                [field]: value,
            },
        }));
    };

    /* -------- Validation -------- */
    const isValid = () => {
        const { images, videos } = data;

        if (
            !images.logo?.trim() ||
            !images.homeRightImage?.trim() ||
            !videos.heroBgVideo?.trim() ||
            !videos.homeMiddleVideo?.trim()
        ) {
            return false;
        }

        return images.guidanceSection.every(img => img?.trim());
    };

    /* -------- Save -------- */
    const saveData = async () => {

        if (!isValid()) {
            toast.error("All image and video URLs are required");
            return;
        }

        try {
            setSaving(true);
            await setMediaSection(data);
            toast.success("Media section saved successfully");
        } 
        catch (err) {
            console.error(err);
            toast.error("Failed to save media section");
        } 
        finally {
            setSaving(false);
        }
    };

    /* -------- States -------- */
    if (loading) return <HomePageLoader count={7} />;
    if (!data) return <CMSFallback message="No data found" />;

    /* -------- UI -------- */
    return (
        <div className="flex flex-col gap-y-4">

            {/* VIDEOS */}
            <CMSSection title="Video Section">
                <CMSCard>
                    <CMSLabel labelText="Hero Section Background Video" />
                    <CMSInput
                        value={data.videos.heroBgVideo}
                        onChange={e =>
                            updateVideoField("heroBgVideo", e.target.value)
                        }
                    />

                    <CMSLabel labelText="Home Section Middle Video" />
                    <CMSInput
                        value={data.videos.homeMiddleVideo}
                        onChange={e =>
                            updateVideoField("homeMiddleVideo", e.target.value)
                        }
                    />
                </CMSCard>
            </CMSSection>

            {/* IMAGES */}
            <CMSSection title="Images">
                <CMSCard>
                    <CMSLabel labelText="Website Logo" />
                    <CMSInput
                        value={data.images.logo}
                        onChange={e =>
                            updateImageField("logo", e.target.value)
                        }
                    />

                    <CMSLabel labelText="Home Section Right Image" />
                    <CMSInput
                        value={data.images.homeRightImage}
                        onChange={e =>
                            updateImageField("homeRightImage", e.target.value)
                        }
                    />
                </CMSCard>
            </CMSSection>

            {/* GUIDANCE IMAGES */}
            <CMSSection title="Insights Section Images">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {
                        data.images.guidanceSection.map((img, i) => (
                            <CMSCard key={i}>
                                <CMSLabel labelText={`Guidance Image ${i + 1}`} />
                                <CMSInput
                                    value={img}
                                    onChange={e =>
                                        updateGuidanceImage(i, e.target.value)
                                    }
                                />
                            </CMSCard>
                        ))
                    }
                </div>
            </CMSSection>

            <CMSButton
                onClick={saveData}
                loading={saving}
                label="Save Media Section"
                loadingLabel="Saving Media Section..."
            />
        </div>
    );
};

export default MediaSectionCMS;