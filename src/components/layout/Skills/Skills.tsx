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

    // Animation principale contrôlée par ScrollTrigger
    tl.fromTo(
      wrapperRef.current,
      { x: "-100vw" },
      {
        x: 0,
        duration: 1,
        ease: "steps(3)",
      }
    );

    // Animation infinie séparée (démarrage après la timeline principale)
    const infiniteAnimation = gsap.to(childrens, {
      keyframes: {
        rotate: [5, -5, 5, -5, 5, -5],
      },
      ease: "steps(6)",
      duration: 3,
      repeat: -1,
      paused: true
    });

    // Démarrer l'animation infinie à la fin de la timeline
    tl.eventCallback("onComplete", () => {
      infiniteAnimation.play();
    });

    return () => {
      tl.kill(); // Nettoyer la timeline
      infiniteAnimation.kill(); // Nettoyer l'animation infinie
      gsap.killTweensOf(childrens); // Nettoyer les tweens restants
    };
  }, []);

  return (
    <div
      className="flex items-center justify-center flex-wrap gap-4 sm:gap-10 w-full"
      ref={wrapperRef}
    >
      {skills.map((techno) => {
        const Icon = iconMap[techno.icon];
        return (
          <p
            key={techno.icon}
            className="flex flex-col items-center gap-1 font-modak uppercase w-[30%] sm:w-fit"
            style={{
              fontSize: "clamp(1.3rem, 5vw, 1.8rem)",
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
