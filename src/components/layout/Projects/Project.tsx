import { Section } from "../../container/Section";
import { ProjectCard } from "./ProjectCard";
import gsap from "gsap";
import { Title } from "../../text/Title";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

export const Project = () => {
  const projects = [
    { projectName: "Taskly", alt: "Kanban board" },
    { projectName: "Bento-running", alt: "Strava visualizer" },
  ];

  useEffect(() => {
    gsap.fromTo(
      "#heart",
      { y: 30, scale: 0 },
      {
        scrollTrigger: {
          trigger: "#projects",
          start: "top 80%",
          end: "top 20%",
          toggleActions: "restart none none reset",
        },
        y: 0,
        keyframes: {
          rotate: [-5, 5, -5, 5, 0],
          scale: [0, 0.3, 0.6, 1.2, 2, 1],
        },
        duration: 0.6,
        delay: 0.5,
        ease: "steps(6)",
        onComplete: () => {
          gsap.to("#heart", {
            keyframes: {
              scale: [1, 1.2, 1, 1.1, 1, 1],

            },
            duration: 0.8,
            ease: "steps(5)",
            repeat: -1,
          });
        },
      }
    );
  });

  return (
    <Section id="projects">
      <div className="flex items-center relative">
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
