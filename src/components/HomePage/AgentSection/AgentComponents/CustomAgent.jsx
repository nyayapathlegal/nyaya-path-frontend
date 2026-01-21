import { AgentCardWrapper } from "@/components/Layouts";
import { motion } from "framer-motion";
import { PanelsTopLeft, Split, Bot } from "lucide-react";

export default function CustomAgentCard({title="", description=""}) {
  return (
    <AgentCardWrapper>
      {/* Soft overlay */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-b from-white/12 to-transparent" />

      {/* HEADER */}
      <div className="relative z-10 flex items-center gap-3">
        {/* Morph Icon */}
        <motion.div
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="p-3 bg-white/25 border border-white/30 rounded-xl shadow-sm"
        >
          <Bot className="w-7 h-7 text-purple-300" />
        </motion.div>

        <div>
          <h3 className="text-white text-xl font-semibold">{title}</h3>
          <p className="text-white/60 text-sm">Dispute & Case Support</p>
        </div>
      </div>

      {/* MORPHING HEX CORE */}
      <div className="relative flex justify-center mt-8 mb-2 z-10">
        {/* Rotating hex frame */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
          className="
            w-24 h-24
            border-[3px]
            border-purple-300/30
            border-t-purple-300
            rounded-xl rotate-45
          "
        />

        {/* Inner morphing core cube */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="
            absolute top-[14px]
            w-16 h-16
            bg-gradient-to-br from-purple-300/40 to-pink-300/40
            shadow-[0_0_30px_rgba(200,100,255,0.35)]
            border border-white/20
            rounded-xl
          "
        />

        {/* Floating identity shards */}
        <motion.div
          animate={{ y: [-6, 6, -6], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute -top-2 left-[22%] text-purple-300"
        >
          <Split className="w-5 h-5" />
        </motion.div>

        <motion.div
          animate={{ y: [6, -6, 6], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3.2 }}
          className="absolute -bottom-2 right-[22%] text-pink-300"
        >
          <PanelsTopLeft className="w-5 h-5" />
        </motion.div>
      </div>

      {/* ADAPTIVE MODE CHIPS */}
      <div className="flex justify-between mt-8 relative z-10">
        {/* Mode Chip 1 */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-3 bg-purple-300/50 rounded"></div>
          <p className="text-xs text-white/50 mt-1">Logic</p>
        </div>

        {/* Mode Chip 2 */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-3 bg-pink-300/50 rounded"></div>
          <p className="text-xs text-white/50 mt-1">Creativity</p>
        </div>

        {/* Mode Chip 3 */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-3 bg-indigo-300/50 rounded"></div>
          <p className="text-xs text-white/50 mt-1">Research</p>
        </div>
      </div>

      {/* TRANSFORMATION ARC BEAM */}
      <motion.div
        animate={{ opacity: [0.35, 1, 0.35], scaleX: [0.85, 1, 0.85] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="
          mt-6 h-3 
          bg-gradient-to-r from-purple-300 to-pink-300 
          rounded-full 
          shadow-[0_0_25px_rgba(200,100,255,0.35)]
        "
      />

      {/* AI MESSAGE */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
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
        <span className="text-purple-300 font-medium">Summary:</span>
        &nbsp;{
          description
        }
      </motion.div>
    </AgentCardWrapper>
  );
}
