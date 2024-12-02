import { useRef, useEffect } from "react";
import gsap from "gsap";
import { iconMap } from "../../../utils/iconMap";

export const Skills = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: "SiReact", name: "React" },
    { icon: "SiNextdotjs", name: "Next.js" },
    { icon: "SiTypescript", name: "TypeScript" },
    { icon: "DiSass", name: "Sass" },
    { icon: "SiTailwindcss", name: "Tailwind" },
    { icon: "TbPlayerTrackNextFilled", name: "GSAP" },
    { icon: "SiFirebase", name: "Firebase" },
  ];

  useEffect(() => {
    // Dupliquer les éléments pour un effet infini
    const childrens = wrapperRef.current?.childNodes;
    gsap.fromTo(
      wrapperRef.current,
      { x: "-100vw" },
      {
        x: 0,
        duration: 1,
        ease: "steps(3)",
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          toggleActions: "play none none reset",
        },
        onComplete: () => {
          if (childrens) {
            gsap.to(childrens, {
              keyframes: {
                rotate: [5, -5, 5, -5, 5, -5],
              },
              ease: "steps(6)",
              duration: 3,
              repeat: -1,
            });
          }
        },
      }
    );
  }, []);

  return (
    <div className="w-full px-3 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-10 lg:flex lg:gap-10 lg:items-center lg:flex-wrap" ref={wrapperRef}>
        {skills.map((techno) => {
          const Icon = iconMap[techno.icon];
          return (
            <p
              key={techno.icon}
              className="flex flex-col items-center gap-1 font-modak uppercase"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 2.5rem)"
              }}
            >
              <Icon
                className="drop-shadow-custom overflow-visible z-10"
                stroke="#f1f5f9"
                paintOrder="stroke"
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{
                  strokeWidth: "clamp(2px, 0.3em, 5px)",
                }}
              />
              {techno.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};
