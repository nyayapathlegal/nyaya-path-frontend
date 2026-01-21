import { AgentCardWrapper } from "@/components/Layouts";
import { motion } from "framer-motion";
import { Star, Layers, Award } from "lucide-react";

export default function SkillCoachCard({title="", description=""}) {
  return (
    <AgentCardWrapper>
      {/* Soft overlay */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-b from-white/15 to-transparent" />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3">
        <motion.div
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="
            p-3 bg-white/25 
            border border-white/30 
            rounded-xl shadow-sm
          "
        >
          <Award className="w-7 h-7 text-blue-300" />
        </motion.div>

        <div>
          <h3 className="text-white text-xl font-semibold">{title}</h3>
          <p className="text-white/60 text-sm">Legal case documentation</p>
        </div>
      </div>

      {/* Mastery Core */}
      <div className="relative flex justify-center mt-7 mb-2 z-10">
        {/* Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="
            w-22 h-22 rounded-full
            border-2 border-blue-300/20
            border-t-blue-300
          "
        />

        {/* Inner skill crystal */}
        <motion.div
          animate={{ scale: [1, 1.13, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="
            absolute top-[12px]
            w-14 h-14 rounded-2xl
            bg-gradient-to-br from-blue-300/40 to-indigo-300/40
            shadow-[0_0_25px_rgba(150,180,255,0.35)]
            border border-white/20
          "
        />

        {/* Achievement star */}
        <motion.div
          animate={{ y: [-6, 6, -6], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute -top-1 right-[25%] text-blue-200"
        >
          <Star className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Skill Module Cluster (NEW visual concept) */}
      <div className="flex justify-between mt-5 relative z-10">
        {/* Module Stack */}
        <div className="flex flex-col items-center gap-1">
          <Layers className="text-blue-300 w-5 h-5 mb-1" />
          <div className="w-10 h-2 rounded bg-blue-400/40"></div>
          <div className="w-8 h-2 rounded bg-blue-300/40"></div>
          <div className="w-6 h-2 rounded bg-blue-200/40"></div>
          <p className="text-xs text-white/50 mt-1">Corporate</p>
        </div>

        {/* Growth Path Node Graph */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-300"></div>
            <div className="w-3 h-3 rounded-full bg-blue-200"></div>
          </div>
          <div className="h-4 w-0.5 bg-blue-300/50"></div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-300"></div>
            <div className="w-3 h-3 rounded-full bg-purple-300"></div>
          </div>
          <p className="text-xs text-white/50 mt-1">ROC</p>
        </div>

        {/* Skill Level Bars */}
        <div className="flex flex-col items-center">
          <div className="flex gap-1">
            <div className="w-1.5 h-8 bg-blue-200/70 rounded"></div>
            <div className="w-1.5 h-11 bg-blue-300/80 rounded"></div>
            <div className="w-1.5 h-6 bg-indigo-200/70 rounded"></div>
            <div className="w-1.5 h-13 bg-indigo-300/80 rounded"></div>
          </div>
          <p className="text-xs text-white/50 mt-1">MCA</p>
        </div>
      </div>

      {/* Coaching Wave */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.85, 1, 0.85] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="
          mt-6 h-3 
          bg-gradient-to-r from-blue-300 to-indigo-300 
          rounded-full 
          shadow-[0_0_20px_rgba(150,180,255,0.35)]
        "
      />

      {/* AI Coaching Message */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="
          mt-6 bg-white/10 
          border border-white/20 
          p-4 rounded-xl 
          text-sm text-white/80 
          shadow-sm
        "
      >
        <span className="text-blue-300 font-medium">Summary:</span>
        &nbsp;{
          description
        }
      </motion.div>
    </AgentCardWrapper>
  );
}
