import { Section } from "../../container/Section";
import { Title } from "../../text/Title";
import { ProjectCard } from "./ProjectCard";

export const Project = () => {

  return (
    <Section>
      <div className="h-full flex flex-col items-center justify-center gap-5">
        <section className="relative">
          <Title content="Projects" headingLevel="h2" />
          <img
            src="./assets/peace.png"
            className="absolute top-0 lg:top-3 -right-6 rotate-12 z-10 drop-shadow-custom will-change-transform"
            style={{
              width: "clamp(40px, 4vw, 100px)",
            }}
          />
        </section>
        <section className="flex flex-col items-center w-[90%] gap-3">
          <ProjectCard projectName="Taskly" />
          <ProjectCard projectName="Bento-running" />
        </section>
      </div>
    </Section>
  );
};
