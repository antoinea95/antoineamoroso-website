import { Section } from "../../container/Section";
import { ProjectCard } from "./ProjectCard";
import gsap from "gsap";
import { Title } from "../../text/Title";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/all";
import projectsData from "../../../projects.json"

gsap.registerPlugin(ScrollTrigger);

/**
 * Project section of the home page, display a title with projects card to navigate to Project page
 */
export const Project = () => {

  // Lists of the projects card
  const projects = projectsData.projects.map((project) => {
    return {projectName: project.name, alt: project.alt}
  })


  // Handle picture animation and reset infinite animation when leave back
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
  
    // Picture animation
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
  
    const infiniteAnimation = gsap.to("#heart", {
      keyframes: {
        scale: [1, 1.2, 1, 1.1, 1, 1],
      },
      duration: 0.8,
      ease: "steps(5)",
      repeat: -1,
      paused: true,
    });
  
    tl.eventCallback("onComplete", () => {
      infiniteAnimation.play();
    });
  
    return () => {
      tl.kill();
      infiniteAnimation.kill();
      gsap.killTweensOf("#heart");
    };
  }, []);
  

  return (
    <Section id="projects">
      <div className="flex items-center relative  px-3 py-1">
        <Title titleText="Projects" headingLevel="h1" trigger="#projects" />
        <img src="./assets/heart.png" className="w-20 stroke-two" id="heart" alt="Illustation of an heart in a retro cartoon style" />
      </div>
      <section className="w-[90%] flex flex-col justify-center items-center relative">
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
