import { AgentCardWrapper } from "@/components/Layouts";
import { motion } from "framer-motion";
import { HeartPulse, Sparkles } from "lucide-react";

export default function EmotionalAgentCard({title="", description=""}) {
  return (
    <AgentCardWrapper>
      {/* Soft top gradient */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-b from-white/15 to-transparent" />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3">
        {/* Icon bubble */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="
            p-3 bg-white/25 
            border border-white/30 
            rounded-xl 
            shadow-sm
          "
        >
          <HeartPulse className="w-7 h-7 text-pink-300" />
        </motion.div>

        <div>
          <h3 className="text-white text-xl font-semibold">{title}</h3>
          {/* <p className="text-white/60 text-sm">AI mood & empathy engine</p> */}
        </div>
      </div>

      {/* EMOTION ORBIT SYSTEM */}
      <div className="relative flex justify-center mt-7 mb-3 z-10">
        {/* Outer orbit */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="
            w-24 h-24 rounded-full
            border-2 border-pink-300/20
            border-t-pink-300
          "
        />

        {/* Emotion core crystal */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="
            absolute top-[22px]
            w-14 h-14
            rounded-2xl
            bg-gradient-to-br from-pink-300/40 to-purple-300/40
            shadow-[0_0_25px_rgba(255,150,200,0.3)]
            border border-white/20
          "
        />

        {/* Floating spark */}
        <motion.div
          animate={{
            y: [-6, 6, -6],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute -top-1 right-[25%] text-pink-300"
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>
      </div>

      {/* EMOTION SPECTRUM METERS */}
      <div className="flex justify-between mt-4 relative z-10">
        {/* Calm */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-2 h-10 rounded bg-blue-300/50"></div>
          <p className="text-xs text-white/50">Compliance</p>
        </div>

        {/* Happy */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-2 h-14 rounded bg-yellow-300/60"></div>
          <p className="text-xs text-white/50">Advisory</p>
        </div>

        {/* Stressed */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-2 h-6 rounded bg-red-300/50"></div>
          <p className="text-xs text-white/50">Documentation</p>
        </div>

        {/* Balanced */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-2 h-12 rounded bg-green-300/60"></div>
          <p className="text-xs text-white/50">Governance</p>
        </div>

        {/* Neutral */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-2 h-8 rounded bg-purple-300/50"></div>
          <p className="text-xs text-white/50">Audit</p>
        </div>
      </div>

      {/* EMOTION WAVE */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="
          mt-6 
          h-3 
          bg-gradient-to-r from-pink-300 to-purple-300 
          rounded-full 
          shadow-[0_0_20px_rgba(255,150,200,0.35)]
          relative z-10
        "
      />

      {/* AI MESSAGE */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="
          mt-6 
          bg-white/10 
          border border-white/20 
          p-4 
          rounded-xl 
          text-sm 
          text-white/80 
          shadow-sm 
          relative z-10
        "
      >
        <span className="text-pink-300 font-medium">Pov:</span>
        &nbsp;{
          description
        }
      </motion.div>
    </AgentCardWrapper>
  );
}
