import { motion } from "framer-motion";

export const AgentCardWrapper = ({ children, className }) => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className={`
        relative
        rounded-3xl 
        p-6 
        w-full 
        max-w-sm
        border border-white/20
        bg-white/10 backdrop-blur-2xl
        shadow-[0_0_55px_rgba(200,150,255,0.2)]
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};
