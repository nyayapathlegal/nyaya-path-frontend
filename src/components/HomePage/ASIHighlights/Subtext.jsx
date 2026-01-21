import { THEMES } from "@/styles/themes";
import { motion } from "framer-motion";
export const Subtext = ({description}) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      className={`mt-3 ${THEMES.current.textSecondary} text-center max-w-2xl relative z-10`}
    >
      {description}
    </motion.p>
  );
};
