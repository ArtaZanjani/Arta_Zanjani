import { Monoco } from "@monokai/monoco-react";
import pfp from "/images/pfp.jpg";
import { socials, contactUs } from "@/utils/path";
import { AnimatePresence, motion, useAnimation } from "motion/react";
import { springTransition } from "@/utils/Animations";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

const MainInfo = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  const parentControls = useAnimation();
  const childControls = useAnimation();

  useEffect(() => {
    parentControls
      .start({
        y: 0,
        transition: { duration: 0.4, delay: 0.2, ease: "backIn" },
      })
      .then(() => {
        childControls.start({ y: 0, opacity: 1 });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const matches = useMediaQuery("(min-width: 1280px)");
  const matches2 = useMediaQuery("(min-width: 460px)");

  return (
    <AnimatePresence>
      <div className="relative w-full xl:w-[400px]">
        {(matches || !matches2) && (
          <Monoco as="div" className="absolute z-10 -translate-x-1/2 size-50 -top-20 left-1/2" borderRadius={20} smoothing={1} clip>
            <img src={pfp} alt="pfp" className="object-cover object-bottom size-full" />
          </Monoco>
        )}
        <Monoco as="div" borderRadius={32} smoothing={1} clip className="bg-white shadow-inner dark:bg-dark w-full h-full duration-200 flex flex-col items-center max-[460px]:pt-32 xl:pt-32 p-3">
          <div className="flex flex-row gap-x-5 xl:min-[460px]:flex-col w-full">
            {!matches && matches2 && (
              <div>
                <Monoco as="div" className="size-50" borderRadius={20} smoothing={1} clip>
                  <img src={pfp} alt="pfp" className="object-cover object-bottom size-full" />
                </Monoco>
              </div>
            )}

            <div className="w-full flex flex-col max-[460px]:items-center xl:items-center gap-y-3">
              <motion.div initial={{ width: 0 }} animate={{ width: "fit-content" }} transition={{ ...springTransition, delay: 0.3 }} className="overflow-hidden flex flex-col max-[460px]:items-center xl:items-center">
                <h1 className="text-3xl text-nowrap font-bold  max-xl:min-[460px]:mt-3">Arta Zanjani</h1>
                <strong className="font-medium text-nowrap text-neutral-600 dark:text-ice/80">Frontend Developer</strong>
              </motion.div>

              <div className="flex-wrap gap-3 full_center w-fit">
                {socials.map((e, index) => (
                  <motion.a
                    href={e.path}
                    key={index}
                    className="size-15 full_center bgColor hover:scale-105 rounded-2xl"
                    variants={containerVariants}
                    transition={{
                      duration: 0.1,
                      type: "spring",
                      ease: "anticipate",
                      delay: index * 0.1,
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    aria-label={e.label}
                  >
                    {e.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <Monoco as={motion.div} borderRadius={16} smoothing={1} clip className="w-full mt-6 overflow-hidden bgColor px-4.5" initial={{ y: 350 }} animate={parentControls}>
            {contactUs.map((e, index) => {
              const Element = e.path ? motion.a : motion.div;

              return (
                <Element
                  key={index}
                  initial={{ y: 500, opacity: 0 }}
                  animate={childControls}
                  transition={{
                    type: "spring",
                    bounce: 0.1,
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                  {...(e.path ? { href: e.path } : {})}
                  className={`py-4.5 flex items-start justify-start gap-x-2.5 ${index !== contactUs.length - 1 && "border-b dark:border-ice"}`}
                >
                  <e.icon className="size-6 fill-orange" variant="Bold" />
                  <div className="flex flex-col">
                    <p className="font-medium text-neutral-600 dark:text-ice/80">{e.label}</p>
                    <p className="">{e.value}</p>
                  </div>
                </Element>
              );
            })}
          </Monoco>
        </Monoco>
      </div>
    </AnimatePresence>
  );
};

export default MainInfo;
