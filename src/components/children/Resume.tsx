import AnimateLayout from "../AnimateLayout";
import { Monoco } from "@monokai/monoco-react";
import { buttons } from "@/utils/path";

const showData = [
  {
    title: "Work Skills",
    badge: ["HTML", "CSS", "JavaScript", "Bootstrap", "Sass", "Tailwind CSS", "Git & GitHub", "TypeScript", "React Js", "Next Js", "MongoDB"],
  },
  {
    title: "Soft Skills",
    badge: ["Time Management", "Performance Excellence", "Quality Orientation", "Flexibility", "Research"],
  },
];

const Resume = () => {
  return (
    <AnimateLayout title={buttons[1].label}>
      <div className="flex flex-col min-[865px]:flex-row justify-between w-full gap-x-40 gap-y-10">
        {showData.map((e, index) => (
          <div key={index}>
            <p className="text-[clamp(16px,5vw,24px)] font-medium ">{e.title}</p>

            <div className="flex flex-wrap flex-1 gap-4 mt-3">
              {e.badge.map((i, idx) => (
                <Monoco as="div" borderRadius={8} smoothing={1} clip className="px-2 py-1 font-medium bgColor " key={idx}>
                  {i}
                </Monoco>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AnimateLayout>
  );
};

export default Resume;
