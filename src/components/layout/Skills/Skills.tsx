import { useRef, useEffect } from "react";
import gsap from "gsap";
import { iconMap } from "../../../utils/iconMap";
import projectData from "../../../projects.json";
import { Title } from "../../text/Title";
import { Section } from "../../container/Section";

/**
 *
 * Display an animate list of skills with an icon and a name
 */
export const Skills = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const skills = projectData.skills;

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top bottom",
        end: "top 20%",
        toggleActions: "restart none none reset",
        onLeaveBack: () => {
          infiniteAnimation.pause();
        },
      },
    });

    // Animation principale contrôlée par ScrollTrigger
    tl.fromTo(
      "#cool",
      { y: 30, scale: 0 },
      {
        y: 0,
        keyframes: {
          rotate: [-5, 5, -5, 5, 0],
          scale: [0, 0.3, 0.6, 1.2, 2, 1],
        },
        duration: 0.6,
        delay: 1,
        ease: "steps(6)",
      }
    );

    // Animation infinie séparée (démarrage après la timeline principale)
    const infiniteAnimation = gsap.to("#cool", {
      rotate: 40,
      duration: 0.8,
      ease: "steps(2)",
      repeat: -1,
      paused: true,
    });

    // Démarrer l'animation infinie à la fin de la timeline
    tl.eventCallback("onComplete", () => {
      infiniteAnimation.play();
    });

    return () => {
      tl.kill(); // Nettoyer la timeline
      infiniteAnimation.kill(); // Nettoyer l'animation infinie
      gsap.killTweensOf("#cool"); // Nettoyer les tweens restants
    };
  }, []);

  // Entry and infinite animation
  useEffect(() => {
    const childrens = wrapperRef.current?.childNodes;

    if (!childrens) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top 80%",
        end: "top 20%",
        toggleActions: "restart none none reset",
        onLeaveBack: () => {
          infiniteAnimation.pause();
        },
      },
    });

    tl.fromTo(
      childrens,
      {
        scale: 0,
      },
      {
        keyframes: {
          rotation: [-5, 5, -5, 5, -5, 5, 0], // Balancement
          scale: [0, 0.3, 0.6, 0.9, 1.6, 1],
        },
        duration: 1,
        delay: 1,
        stagger: 0.07,
        ease: "steps(5)",
      }
    );

    const infiniteAnimation = gsap.to(childrens, {
      keyframes: {
        rotate: [5, -5, 5, -5, 5, -5],
      },
      ease: "steps(6)",
      duration: 3,
      repeat: -1,
      paused: true,
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
    <Section id="skills">
      <div className="flex items-center relative">
        <Title titleText="Skills" headingLevel="h2" trigger="#skills" />
        <img
          src="./assets/cool.png"
          className=" w-16 lg:w-20 stroke-two"
          id="cool"
          alt="Illustation of hand doing a surfer sign"
        />
      </div>
      <div
        className="flex flex-col gap-12 lg:flex-row items-center justify-center flex-wrap lg:gap-16 w-full "
        ref={wrapperRef}
      >
        {skills.map((techno) => {
          const Icon = iconMap[techno.icon];
          return (
            <p
              key={techno.icon}
              className="flex flex-col items-center gap-3 font-modak uppercase w-fit"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
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
    </Section>
  );
};
