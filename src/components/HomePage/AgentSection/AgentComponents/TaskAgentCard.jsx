"use client";

import { AgentCardWrapper } from "@/components/Layouts";
import { motion } from "framer-motion";
import { Check, Settings, CheckSquare } from "lucide-react";

export default function TaskAgentCard({title="", description=""}) {
  return (
    <AgentCardWrapper>
      {/* SOFT TOP LIGHT GRADIENT */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-b from-white/20 to-transparent" />

      {/* TOP HEADER */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="
              p-3 
              bg-white/20 
              border border-white/30 
              rounded-xl 
              shadow-sm
            "
          >
            <CheckSquare className="w-7 h-7 text-[#80f2d2]" />
          </motion.div>

          <div>
            <h3 className="text-white text-xl font-semibold">{title}</h3>
            <p className="text-white/60 text-sm">Dispute & Case Support</p>
          </div>
        </div>

        <Settings className="text-white/40 w-5 h-5" />
      </div>

      {/* AI CORE PULSE */}
      <div className="flex justify-center mt-6 relative z-10">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="
            w-20 h-20 rounded-full
            bg-gradient-to-br from-[#9fffe9]/20 to-[#60ffd1]/20
            shadow-[0_0_60px_rgba(0,255,200,0.35)]
          "
        ></motion.div>
      </div>

      {/* PIPELINE MACHINE SECTION */}
      <div className="mt-8 space-y-5 relative z-10">
        {/* Conveyor path */}
        <div
          className="
          relative h-12 
          bg-white/10 
          rounded-xl 
          border border-white/20 
          overflow-hidden 
          shadow-inner
        "
        >
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="
              absolute top-0 left-0 h-full w-full 
              opacity-40
              bg-[repeating-linear-gradient(90deg,#ffffff20_0px,#ffffff20_12px,#ffffff10_12px,#ffffff10_24px)]
            "
          />

          {/* Task capsules */}
          <motion.div
            animate={{ x: ["-20%", "120%"] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
            className="
              absolute top-[50%] -translate-y-1/2 
              w-14 h-5 bg-[#76ffe4]/40 rounded-full 
              border border-[#76ffe4]/50
            "
          ></motion.div>

          <motion.div
            animate={{ x: ["0%", "140%"] }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            className="
              absolute top-[50%] -translate-y-1/2 
              w-12 h-5 bg-[#a8ffea]/40 rounded-full 
              border border-[#a8ffea]/40
            "
          ></motion.div>
        </div>

        {/* CHECKPOINT STATION */}
        <div
          className="
            p-4 bg-white/10 border border-white/20 
            rounded-xl flex items-center gap-4 shadow-sm
          "
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="
              w-8 h-8 rounded-full bg-[#76ffe4]/20 border 
              border-[#76ffe4] flex items-center justify-center
            "
          >
            <Check className="text-[#76ffe4] w-5 h-5" />
          </motion.div>

          <div>
            <p className="text-white/80 text-sm">Completed</p>
            <p className="text-white/50 text-xs">AI validated task</p>
          </div>
        </div>

        {/* AUTOMATION WAVE */}
        <motion.div
          animate={{ width: ["20%", "100%", "20%"] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="
            h-[3px] 
            bg-gradient-to-r from-[#89ffe2] to-[#5fffd0] 
            rounded-full shadow-[0_0_10px_#5fffd0]
          "
        ></motion.div>
      </div>

      {/* AI MESSAGE */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="
          mt-6 bg-white/10 border border-white/20 
          p-3 rounded-lg text-sm text-white/80 shadow-sm relative z-10
        "
      >
        <span className="text-[#9affea] font-medium">Summary:</span>
        &nbsp;{
        description
      }
      </motion.div>
    </AgentCardWrapper>
  );
}
