import { useRef, useEffect } from "react";
import gsap from "gsap";
import { iconMap } from "../../../utils/iconMap";
import projectData from "../../../projects.json";

/**
 * 
 * Display an animate list of skills with an icon and a name
 */
export const Skills = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const skills = projectData.skills;


  // Entry and infinite animation
  useEffect(() => {
    const childrens = wrapperRef.current?.childNodes;

    if(!childrens) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        end: "top 20%",
        toggleActions: "restart none none reset",
        onLeaveBack: () => {
          infiniteAnimation.pause();
        },
      },
    });

    tl.fromTo(
      wrapperRef.current,
      {
        scale: 0,
      },
      {
        keyframes: {
          rotation: [-5, 5, -5, 5, -5, 5, 0], // Balancement
          scale: [0, 0.3, 0.6, 0.9, 1.2, 1],
        },
        duration: 1,
        delay: 0.6,
        ease: "steps(5)",
      },
    );

    const infiniteAnimation = gsap.to(childrens, {
      keyframes: {
        rotate: [5, -5, 5, -5, 5, -5],
      },
      ease: "steps(6)",
      duration: 3,
      repeat: -1,
      paused: true
    });

    tl.eventCallback("onComplete", () => {
      infiniteAnimation.play();
    });

    return () => {
      tl.kill(); 
      infiniteAnimation.kill();
      gsap.killTweensOf(childrens); 
    };
  }, []);

  return (
    <div
      className="flex items-center justify-center flex-wrap gap-4 sm:gap-10 w-full "
      ref={wrapperRef}
    >
      {skills.map((techno) => {
        const Icon = iconMap[techno.icon];
        return (
          <p
            key={techno.icon}
            className="flex flex-col items-center gap-1 font-modak uppercase max-w-[30%] sm:w-fit"
            style={{
              fontSize: "clamp(1.3rem, 5vw, 2.3rem)",
            }}
          >
            <Icon
              className="drop-shadow-custom overflow-visible z-10 stroke-tertiary"
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
  );
};
