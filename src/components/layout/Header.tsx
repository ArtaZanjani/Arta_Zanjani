import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const { toggleTheme } = useTheme();
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} />

      <header className={`sticky left-0 z-20 flex items-center justify-between w-full padding_body py-5 duration-200 top-0 ${isSticky ? "backdrop-blur-2xl" : ""}`}>
        <p className="text-3xl">Arta</p>

        <button onClick={toggleTheme} className="rounded-full size-14 bgColor full_center" aria-label="Toggle theme">
          <Sun className="hidden dark:block dark:stroke-ice" />
          <Moon className="dark:hidden" />
        </button>
      </header>
    </>
  );
};

export default Header;
