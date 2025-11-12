import Monoco from "@monokai/monoco-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { type ButtonLabel, buttons } from "@/utils/path";

const MoreInfo = () => {
  const [activeButton, setActiveButton] = useState<ButtonLabel>("Home");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const updatePosition = useCallback(() => {
    const activeIndex = buttons.findIndex((button) => button.label === activeButton);
    const activeElement = buttonRefs.current[activeIndex];
    const container = containerRef.current;

    if (!activeElement || !container) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeElement.getBoundingClientRect();

    setIndicatorStyle({
      left: buttonRect.left - containerRect.left + container.scrollLeft,
      width: buttonRect.width,
    });
  }, [activeButton]);

  const scrollToActive = useCallback(() => {
    const activeIndex = buttons.findIndex((button) => button.label === activeButton);
    const activeElement = buttonRefs.current[activeIndex];

    activeElement?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeButton]);

  useEffect(() => {
    scrollToActive();
    updatePosition();
  }, [activeButton, scrollToActive, updatePosition]);

  useEffect(() => {
    const handleUpdate = () => updatePosition();
    const container = containerRef.current;

    window.addEventListener("resize", handleUpdate);
    container?.addEventListener("scroll", handleUpdate);

    const timer1 = setTimeout(updatePosition, 0);
    const timer2 = setTimeout(updatePosition, 50);
    const timer3 = setTimeout(updatePosition, 100);

    return () => {
      window.removeEventListener("resize", handleUpdate);
      container?.removeEventListener("scroll", handleUpdate);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [updatePosition]);

  const activeIndex = buttons.find((button) => button.label === activeButton);

  return (
    <AnimatePresence>
      <div className="flex flex-col justify-between max-xl:w-full xl:flex-1 gap-y-3 xl:gap-y-10">
        <Monoco as="div" borderRadius={32} smoothing={1} clip className="relative overflow-x-auto whitespace-nowrap flex items-center w-full p-3 duration-200 bg-white shadow-inner min-[738px]:gap-x-5 h-25 dark:bg-dark" ref={containerRef}>
          <Monoco borderRadius={16} smoothing={1} clip as={motion.div} className="absolute h-[71.25px] bg-orange/20" initial={false} animate={indicatorStyle} transition={{ type: "spring", stiffness: 400, damping: 40 }} />

          {buttons.map((e, index) => (
            <Monoco
              borderRadius={16}
              smoothing={1}
              clip
              as="button"
              className={`relative flex flex-col items-center justify-center h-full min-w-40 gap-y-1 z-10 duration-200 ${activeButton !== e.label && "hover:bg-black/10 dark:hover:bg-ice/10"}`}
              onClick={() => setActiveButton(e.label)}
              key={index}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
            >
              <e.icon className="size-8" color="var(--color-orange)" variant={activeButton === e.label ? "Bold" : "Bulk"} />
              <p className="font-Poppins_Medium">{e.label}</p>
            </Monoco>
          ))}
        </Monoco>

        <Monoco as="div" borderRadius={32} smoothing={1} clip className="flex-1 duration-200 bg-white shadow-inner dark:bg-dark">
          {activeIndex && activeIndex.children}
        </Monoco>
      </div>
    </AnimatePresence>
  );
};

export default MoreInfo;
