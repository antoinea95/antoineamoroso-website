import { Section } from "../../container/Section";
import { ProjectCard } from "./ProjectCard";
import gsap from "gsap";
import { Title } from "../../text/Title";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const Project = () => {
  const projects = [
    { projectName: "Taskly", alt: "Kanban board" },
    { projectName: "Bento-running", alt: "Strava visualizer" },
  ];

  useEffect(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#projects",
        start: "top 80%",
        end: "top 20%",
        toggleActions: "restart none none reset",
        onLeaveBack: () => {
          infiniteAnimation.pause();
        }
      },
    });
  
    // Animation principale contrôlée par ScrollTrigger
    tl.fromTo(
      "#heart",
      { y: 30, scale: 0 },
      {
        y: 0,
        keyframes: {
          rotate: [-5, 5, -5, 5, 0],
          scale: [0, 0.3, 0.6, 1.2, 2, 1],
        },
        duration: 0.6,
        delay: 0.5,
        ease: "steps(6)",
      }
    );
  
    // Animation infinie séparée (démarrage après la timeline principale)
    const infiniteAnimation = gsap.to("#heart", {
      keyframes: {
        scale: [1, 1.2, 1, 1.1, 1, 1],
      },
      duration: 0.8,
      ease: "steps(5)",
      repeat: -1,
      paused: true, // On commence en pause
    });
  
    // Démarrer l'animation infinie à la fin de la timeline
    tl.eventCallback("onComplete", () => {
      infiniteAnimation.play();
    });
  
    return () => {
      tl.kill(); // Nettoyer la timeline
      infiniteAnimation.kill(); // Nettoyer l'animation infinie
      gsap.killTweensOf("#heart"); // Nettoyer les tweens restants
    };
  }, []);
  

  return (
    <Section id="projects">
      <div className="flex items-center relative  px-3 py-1">
        <Title titleText="Projects" headingLevel="h1" trigger="#projects" />
        <img src="./assets/heart.png" className="w-20 stroke-two" id="heart" />
      </div>
      <section className="w-[90%] flex flex-col justify-center relative">
        {projects.map((project, index) => (
          <ProjectCard
            projectName={project.projectName}
            alt={project.alt}
            key={project.projectName}
            number={index + 1}
          />
        ))}
      </section>
    </Section>
  );
};
