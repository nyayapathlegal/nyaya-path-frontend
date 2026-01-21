import { AgentCardWrapper } from "@/components/Layouts";
import { motion } from "framer-motion";
import { Atom, BookOpenCheck, Sparkles, BookOpen } from "lucide-react";

export default function StudyHelperUltraUnique({title="", description=""}) {
  return (
    <AgentCardWrapper>
      {/* Soft overlay */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none bg-linear-to-b from-white/15 to-transparent" />

      {/* HEADER */}
      <div className="relative z-10 flex items-center gap-3">
        <motion.div
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="
            p-3 bg-white/25 border border-white/30
            rounded-xl shadow-sm
          "
        >
          <BookOpen className="w-7 h-7 text-cyan-300" />
        </motion.div>

        <div>
          <h3 className="text-white text-xl font-semibold">{title}</h3>
          <p className="text-white/60 text-sm">- Filing mandatory returns & reports</p>
        </div>
      </div>

      {/* NEURO STUDY SPHERE */}
      <div className="relative flex justify-center mt-8 mb-4 z-10">
        {/* Main studying sphere */}
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ repeat: Infinity, duration: 2.4 }}
          className="
            w-24 h-24 rounded-full
            bg-linear-to-br from-cyan-300/40 to-blue-300/40
            shadow-[0_0_45px_rgba(120,200,255,0.35)]
          "
        />

        {/* DNA Learning Helix */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="
            absolute w-16 h-16 rounded-full 
            border-2 border-cyan-300/40 border-l-transparent
          "
        />

        {/* Floating Notebook */}
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="
            absolute top-5
            w-17.5 h-12.5
            bg-white/20 border border-white/30
            rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.3)]
            flex items-center justify-center
          "
        >
          <BookOpenCheck className="w-5 h-5 text-cyan-200" />
        </motion.div>

        {/* AI Thought Spark */}
        <motion.div
          animate={{ y: [-5, 5, -5], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute -top-2 right-[22%] text-cyan-300"
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>
      </div>

      {/* MEMORY CAPSULES */}
      <div className="flex justify-between mt-8 relative z-10">
        {/* Capsule 1 */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-3 bg-cyan-300/50 rounded-full"></div>
          <p className="text-xs text-white/50 mt-1">Tax</p>
        </div>

        {/* Capsule 2 */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-3 bg-blue-300/50 rounded-full"></div>
          <p className="text-xs text-white/50 mt-1">Legal</p>
        </div>

        {/* Capsule 3 */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-3 bg-indigo-300/50 rounded-full"></div>
          <p className="text-xs text-white/50 mt-1">Criminal</p>
        </div>
      </div>

      {/* STUDY SCAN BEAM */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 2.8 }}
        className="
          mt-6 h-3 
          bg-linear-to-r from-cyan-300 to-blue-300 
          rounded-full 
          shadow-[0_0_25px_rgba(120,200,255,0.35)]
        "
      />

      {/* AI MESSAGE BOX */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="
          mt-6 bg-white/10 border border-white/20
          p-4 rounded-xl text-sm text-white/80 shadow-sm
        "
      >
        <span className="text-sky-300 font-medium">Summary:</span>
        &nbsp;{
          description
        }
      </motion.div>
    </AgentCardWrapper>
  );
}
