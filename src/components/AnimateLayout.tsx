import { motion } from "motion/react";
import { springTransition } from "@/utils/Animations";

const AnimateLayout = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <motion.div className="p-7" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={springTransition}>
      <div className="flex items-center gap-x-4 pb-3.5">
        <h1 className="text-[clamp(25px,5vw,40px)] font-Poppins_Medium">{title}</h1>

        <div className="flex-1 max-w-63 h-0.5 bg-orange"></div>
      </div>

      {children}
    </motion.div>
  );
};

export default AnimateLayout;
