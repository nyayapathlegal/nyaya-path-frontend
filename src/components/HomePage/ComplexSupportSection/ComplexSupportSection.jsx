"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LegalExpertiseCard from "../PracticeAreas/EmotionalIntelligenceCard";
import TextSection from "./TextSection";
import { getExpertiesOverview } from "@/api/home/home.api";
import { EXPERTIES_OVERVIEW_FALLBACK } from "@/config/fallbacks/homepageFallbacks";

export function ComplexSupportSection() {

	const [data, setData] = useState(null);

	useEffect(() => {
		async function fetchLegalExperienceOverviewData() {
			try {
				const data = await getExpertiesOverview();
				setData(data);
			}
			catch (error) {
				console.error("Error fetching Legal Experience Overview data:", error);
				setData(EXPERTIES_OVERVIEW_FALLBACK);
			}
		}
		fetchLegalExperienceOverviewData();
	}, []);

	return (
		<section className="flex flex-col lg:flex-row gap-12 lg:gap-20 sm:px-8 items-stretch mt-20">
			{/*  card */}
			<motion.div
				className="flex-1"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
				whileHover={{ scale: 1.03, boxShadow: "0px 20px 40px rgba(0,0,0,0.15)" }}
			>
				<LegalExpertiseCard card={data?.card} />
			</motion.div>

			{/* Left + Right Sections */}
			<motion.div
				className="flex-1 flex items-center justify-center"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<TextSection description={data?.description} />
			</motion.div>
		</section>
	);
}
