import { buttons } from "@/utils/path";
import AnimateLayout from "../AnimateLayout";
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import Card from "../card/Card";
import type { ProjectType } from "@/types/type";
import useSWR from "swr";
import { fetcher } from "@/utils/function";
import ErrorUi from "../ErrorUi";
const sorts = ["Newest", "Oldest"] as const;

const Projects = () => {
  const [sort, setSort] = useState<(typeof sorts)[number]>("Newest");
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = sorts.indexOf(sort);
    const activeButton = buttonRefs.current[activeIndex];
    const container = containerRef.current;

    if (activeButton && container) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      setIndicator({
        left: buttonRect.left - containerRect.left + container.scrollLeft,
        width: buttonRect.width,
      });
    }
  }, [sort]);

  const { data, isLoading, error } = useSWR<ProjectType[]>("projects", fetcher);

  const sortedData = sort === "Newest" ? [...(data ?? [])].reverse() : data ?? [];

  return (
    <AnimateLayout title={buttons[2].label}>
      <div ref={containerRef} className="relative flex items-center w-full gap-x-4">
        {sorts.map((e, index) => (
          <button
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            className={`font-Poppins_Medium duration-200 ${e === sort && "text-orange"}`}
            onClick={() => setSort(e)}
            key={index}
          >
            {e}
          </button>
        ))}
        <div className="w-full absolute -bottom-1.5 h-0.5 bgColor !shadow-xs"></div>
        <motion.div className="absolute -bottom-1.5 h-0.5 bg-orange z-20" animate={{ left: indicator.left, width: indicator.width }} />
      </div>

      {isLoading ? (
        <div className={`mt-7 grid grid-cols-[repeat(auto-fit,minmax(270px,auto))] justify-center min-[665px]:justify-between gap-5 ${isLoading && "animate-pulse"}`}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Card isLoading key={index} />
          ))}
        </div>
      ) : sortedData.length ? (
        <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(270px,auto))] justify-center min-[665px]:justify-between gap-5">
          {sortedData.map((e) => (
            <Card isLoading={false} image={e.image} title={e.title} category={e.category} link={e.link} id={e.id} key={e.id} />
          ))}
        </div>
      ) : (
        <ErrorUi title="No Projects Found" error={error ?? "There are currently no projects available. Please check back later"} />
      )}
    </AnimateLayout>
  );
};

export default Projects;
