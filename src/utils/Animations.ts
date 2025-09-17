import type { Transition } from "motion/react";

export const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 40,
  delay: 0.1,
  ease: [0.5, 0.2, 0.9, 0.4],
};
