import { Section } from "../../container/Section";
import { ProjectCard } from "./ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Title } from "../../text/Title";

gsap.registerPlugin(ScrollTrigger);

export const Project = () => {

  const projects = [
    { projectName: "Taskly", alt: "Kanban board" },
    { projectName: "Bento-running", alt: "Strava visualizer" },
  ]
  
  return (
    <Section id="projects">
        <Title titleText="Projects" headingLevel="h1" trigger="#projects" />
        <section className="w-[90%] flex flex-col justify-center gap-5 overflow-hidden h-1/2 relative">
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
