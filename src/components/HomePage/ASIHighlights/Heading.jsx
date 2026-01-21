import { THEMES } from "@/styles/themes";
import { motion } from "framer-motion";
export const Heading = ({subheading}) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`text-2xl md:text-3xl font-semibold text-center ${THEMES.current.textPrimary} max-w-3xl leading-snug relative z-10 mt-5`}
    >
      {subheading}
    </motion.h2>
  );
};
