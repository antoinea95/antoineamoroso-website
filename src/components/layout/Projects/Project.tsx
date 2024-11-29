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
    <Section>
      <div
        id="project"
        className="flex flex-col items-center justify-evenly h-full"
      >
        <Title titleText="Projects" headingLevel="h1" trigger="#project" />

        <section className="w-[90%] flex flex-col justify-center gap-5 overflow-hidden h-1/2">
          {projects.map((project, index) => (
            <ProjectCard
              projectName={project.projectName}
              alt={project.alt}
              key={project.projectName}
              number={index + 1}
            />
          ))}
        </section>
      </div>
    </Section>
  );
};
