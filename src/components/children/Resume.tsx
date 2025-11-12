import AnimateLayout from "../AnimateLayout";
import { Monoco } from "@monokai/monoco-react";
import { buttons } from "@/utils/path";
import useSWR from "swr";
import { fetcher } from "@/utils/function";
import type { SkillType } from "@/types/type";
import Spinner from "../Spinner";
import ErrorUi from "../ErrorUi";
const Resume = () => {
  const { data, error, isLoading } = useSWR<SkillType[]>("skills", fetcher);

  const softSkills = ["Time Management", "Performance Excellence", "Quality Orientation", "Flexibility", "Research"];

  const renderSkills = (title: string, skills: SkillType[] | string[]) => (
    <div className="flex-1">
      <p className="text-[clamp(16px,5vw,24px)] font-Poppins_Medium">{title}</p>
      <div className="flex flex-wrap flex-1 gap-4 mt-3">
        {skills.map((skill, index) => {
          const label = typeof skill === "string" ? skill : skill.skill;
          return (
            <Monoco as="div" borderRadius={8} smoothing={1} clip className="px-3 py-2 font-Poppins_Medium bgColor" key={index}>
              {label}
            </Monoco>
          );
        })}
      </div>
    </div>
  );

  return (
    <AnimateLayout title={buttons[1].label}>
      <div className="flex flex-col min-[865px]:flex-row justify-between w-full gap-x-40 gap-y-10">
        {isLoading ? (
          <div className="flex-1">
            <Spinner />
          </div>
        ) : data?.length ? (
          renderSkills("Work Skills", data)
        ) : (
          <ErrorUi title="No Skills Found" error={error ?? "There are currently no skills available. Please check back later"} />
        )}

        {renderSkills("Soft Skills", softSkills)}
      </div>
    </AnimateLayout>
  );
};

export default Resume;
