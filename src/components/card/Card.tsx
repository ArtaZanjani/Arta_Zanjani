import Monoco from "@monokai/monoco-react";
import { Image, ArrowRight } from "iconsax-react";
import type { ProjectType } from "@/types/type";
import { useState } from "react";
import { useTheme } from "@/context/ThemeProvider";

export type CardPropsType = { isLoading: true } | ({ isLoading: false } & ProjectType);

const Card = (props: CardPropsType) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const { theme } = useTheme();

  return (
    <Monoco className="flex flex-col p-4 w-72 bgColor" borderRadius={24} smoothing={1} clip as="div">
      <Monoco as="div" className="w-full innerBgColor h-28.5 full_center p-3" borderRadius={12} smoothing={1} clip>
        {props.isLoading || imageError || !props.image.length ? <Image className="size-10 stroke-black dark:stroke-ice" /> : <img src={props.image} alt={props.title} onError={() => setImageError(true)} className={`object-contain size-full filter ${theme === "light" ? "brightness-80" : "brightness-120"}`} />}
      </Monoco>

      {props.isLoading ? (
        <>
          <div className="h-6 w-17.5 innerBgColor mt-4.5 rounded-lg" />
          <div className="flex items-end justify-between w-full mt-auto">
            <div className="w-32 h-6 rounded-lg innerBgColor" />
            <button className="rounded-full size-10 innerBgColor full_center">
              <ArrowRight className="size-6 stroke-black dark:stroke-ice" />
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-lg font-Poppins_Bold mt-4.5">{props.title}</p>
          <div className="flex items-end justify-between flex-1 w-full mt-auto">
            <p className="text-sm">{props.category}</p>
            <a href={props.link} target="_blank" className="rounded-full size-10 innerBgColor full_center">
              <ArrowRight className="size-6 stroke-black dark:stroke-ice" />
            </a>
          </div>
        </>
      )}
    </Monoco>
  );
};

export default Card;
