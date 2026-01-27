"use client";

import { useEffect, useState } from "react";

import CMSSection from "../CMS/CMSSection";
import CMSInput from "../CMS/CMSInput";
import CMSTextarea from "../CMS/CMSTextarea";
import CMSCard from "../CMS/CMSCard";
import CMSSubmitButton from "../CMS/CMSSubmitButton";
import CMSLabel from "../CMS/CMSLabel";
import CMSFallback from "../CMS/CMSFallback";
import HomePageLoader from "../Loaders/HomePageLoader";
import toast from "react-hot-toast";
import { getFooter } from "../../../../api/home/home.api";
import { setFooter } from "../../../../api/client/client.api";

const FooterCMS = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const MAX_SOCIAL_LINKS = 6;

    /* Fetch footer data */
    useEffect(() => {
        const fetchFooter = async () => {
            try {
                const res = await getFooter();
                setData(res);
            }
            catch (err) {
                console.error("Failed to fetch footer data", err);
                setData(null);
            }
            finally {
                setLoading(false);
            }
        };
        fetchFooter();
    }, []);

    /* Update top-level fields */
    const updateField = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    /* Update social media item */
    const updateSocial = (index, field, value) => {
        setData(prev => {
            const updated = [...prev.socialMediaLinks];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, socialMediaLinks: updated };
        });
    };

    /* Add social link */
    const addSocial = () => {
        setData(prev => {
            if (prev.socialMediaLinks.length >= MAX_SOCIAL_LINKS) return prev;
            return {
                ...prev,
                socialMediaLinks: [
                    ...prev.socialMediaLinks,
                    { name: "", url: "", img: "" }
                ]
            };
        });
    };

    /* Remove social link */
    const removeSocial = (index) => {
        setData(prev => ({
            ...prev,
            socialMediaLinks: prev.socialMediaLinks.filter((_, i) => i !== index)
        }));
    };

    /* Validation */
    const isValid = () => {
        if (
            !data.videoText?.trim() ||
            !data.footerText?.trim() ||
            !data.phoneNumber?.trim() ||
            !data.gmail?.trim() ||
            !data.address?.trim() ||
            !data.branch?.trim()
        ) return false;

        return data.socialMediaLinks.every(
            item =>
                item.name?.trim() &&
                item.url?.trim() &&
                item.img?.trim()
        );
    };

    /* Save footer */
    const saveFooter = async () => {
        if (!isValid()) {
            toast.error("All fields are required");
            return;
        }

        try {
            setSaving(true);
            await setFooter(data);
            toast.success("Footer saved successfully");
        }
        catch (err) {
            console.error("Failed to save footer", err);
            toast.error("Failed to save footer");
        }
        finally {
            setSaving(false);
        }
    };

    if (loading) return <HomePageLoader count={8} />;
    if (!data) return <CMSFallback message="No footer found." />;

    return (
        <div className="flex flex-col gap-y-4">

            <CMSSection title="Footer Section">

                {/* Footer Main Content */}
                <CMSCard>
                    <CMSLabel labelText="Company Name" />
                    <CMSInput
                        value={data.videoText}
                        onChange={e => updateField("videoText", e.target.value)}
                    />

                    <CMSLabel labelText="Footer Description" />
                    <CMSTextarea
                        value={data.footerText}
                        onChange={e => updateField("footerText", e.target.value)}
                    />

                    <CMSLabel labelText="Phone Number" />
                    <CMSInput
                        value={data.phoneNumber}
                        onChange={e => updateField("phoneNumber", e.target.value)}
                    />

                    <CMSLabel labelText="Gmail / Email" />
                    <CMSInput
                        value={data.gmail}
                        onChange={e => updateField("gmail", e.target.value)}
                    />

                    <CMSLabel labelText="Address" />
                    <CMSTextarea
                        value={data.address}
                        onChange={e => updateField("address", e.target.value)}
                    />

                    <CMSLabel labelText="Branch" />
                    <CMSInput
                        value={data.branch}
                        onChange={e => updateField("branch", e.target.value)}
                    />
                </CMSCard>

                {/* Social Media Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.socialMediaLinks.map((item, index) => (
                        <CMSCard key={index}>
                            <CMSLabel labelText={`Social ${index + 1} Name`} />
                            <CMSInput
                                value={item.name}
                                onChange={e =>
                                    updateSocial(index, "name", e.target.value)
                                }
                            />

                            <CMSLabel labelText="Profile URL" />
                            <CMSInput
                                value={item.url}
                                onChange={e =>
                                    updateSocial(index, "url", e.target.value)
                                }
                            />

                            <CMSLabel labelText="Icon Image URL" />
                            <CMSInput
                                value={item.img}
                                onChange={e =>
                                    updateSocial(index, "img", e.target.value)
                                }
                            />

                            <button
                                className="text-red-500 mt-2 text-sm"
                                onClick={() => removeSocial(index)}
                            >
                                Remove Social
                            </button>
                        </CMSCard>
                    ))}
                </div>

                {data.socialMediaLinks.length < MAX_SOCIAL_LINKS && (
                    <button
                        className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
                        onClick={addSocial}
                    >
                        + Add Social Link
                    </button>
                )}

            </CMSSection>

            <CMSSubmitButton
                onClick={saveFooter}
                loading={saving}
                label="Save Footer"
                loadingLabel="Saving Footer..."
            />
        </div>
    );
};

export default FooterCMS;
