import { useRef, useEffect } from "react";
import { Techno } from "../../text/Techno";
import gsap from "gsap";

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
    if (!wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    const items = wrapper.children;

    // Calculer la largeur totale
    const totalWidth = Array.from(items).reduce(
      (acc, item) => acc + (item as HTMLElement).offsetWidth,
      0
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        toggleActions: "play none none reset"
      },
    });

    // Dupliquer les éléments pour un effet infini
    gsap.set(wrapper, { x: "100vw" });
    tl.to(wrapper, {
      x: 0,
      duration: 1,
      ease: "steps(3)",
    }).to(items, {
        keyframes: {
          rotate: [-5, 5, -5],
        },
        duration: 1,
        ease: "steps(5)",
        repeat: -1,
      }).to(wrapper, {
      x: -totalWidth / 2, // Se déplace jusqu'à la moitié (boucle parfaite)
      duration: 10,
      ease: "steps(20)",
      repeat: -1,
    });
  });

  return (
    <div className="w-full py-10">
      <div className="flex" ref={wrapperRef}>
        {[...skills, ...skills].map((skill, index) => (
          <div key={index} className="flex items-center px-2 lg:px-4">
            <Techno techno={skill} size="text-2xl sm:text-4xl" />
          </div>
        ))}
      </div>
    </div>
  );
};
