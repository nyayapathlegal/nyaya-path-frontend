"use client";

import { AgentCardWrapper } from "@/components/Layouts";
import { motion } from "framer-motion";

export default function ProfessionalServiceCard({title="", description=""}) {
  return (
    <AgentCardWrapper>
      {/* Soft Top Fade */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-b from-white/10 to-transparent" />

      {/* HEADER */}
      <div className="relative z-10 flex items-center gap-3">
        {/* Hologram Badge */}
        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="p-3 bg-white/25 border border-white/30 rounded-xl shadow-sm"
        >
          <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-300 to-purple-400 shadow-inner" />
        </motion.div>

        <div>
          <h3 className="text-white text-xl font-semibold">
          {title}
          </h3>
          <p className="text-white/60 text-sm">
            Legal • Tax • Compliance
          </p>
        </div>
      </div>

      {/* FLOATING CORE */}
      <div className="relative flex justify-center mt-8 mb-4 z-10">
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="
            w-16 h-16 
            bg-gradient-to-br from-indigo-300/40 to-purple-400/40
            border border-white/20
            rounded-xl
            shadow-[0_0_30px_rgba(150,120,255,0.35)]
          "
        />

        {/* Orbit Dot 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="
            absolute -top-2 right-[30%]
            w-5 h-5 rounded-full
            bg-indigo-300/40 border border-indigo-200
          "
        />

        {/* Orbit Dot 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
          className="
            absolute -bottom-2 left-[30%]
            w-6 h-6 rounded-full
            bg-purple-300/40 border border-purple-200
          "
        />
      </div>

      {/* SERVICE FLOW GRID */}
      <div className="mt-8 grid grid-cols-3 gap-4 relative z-10">
        <div className="flex flex-col items-center">
          <div className="w-10 h-2 bg-indigo-300/60 rounded"></div>
          <p className="text-white/50 text-xs mt-1">Clients</p>
        </div>

        <div className="flex justify-center">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="
              w-0.5 h-12
              bg-gradient-to-b from-indigo-300 to-purple-400
              rounded-full shadow-[0_0_10px_rgba(160,120,255,0.6)]
            "
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-2 bg-purple-300/60 rounded"></div>
          <p className="text-white/50 text-xs mt-1">Authorities</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-indigo-300/70 mb-1" />
          <p className="text-white/50 text-xs">Process</p>
        </div>

        <div className="flex justify-center items-center">
          <svg width="50" height="20">
            <path
              d="M5 15 C20 -2, 30 -2, 45 15"
              stroke="#c7b8ff"
              strokeWidth="2"
              fill="none"
              className="opacity-70"
            />
          </svg>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-2 bg-indigo-200/60 rounded"></div>
          <p className="text-white/50 text-xs mt-1">Compliance</p>
        </div>
      </div>

      {/* TRUST BEAM */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="
          mt-7 h-3
          bg-gradient-to-r from-indigo-300 to-purple-400
          rounded-full
          shadow-[0_0_20px_rgba(150,120,255,0.35)]
        "
      />

      {/* AI MESSAGE */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="
          mt-6 bg-white/10
          border border-white/20
          p-4 rounded-xl
          text-sm text-white/80
        "
      >
        <span className="text-indigo-300 font-medium">
          Summary: 
        </span>
        &nbsp;{
          description
        }
      </motion.div>
    </AgentCardWrapper>
  );
}
