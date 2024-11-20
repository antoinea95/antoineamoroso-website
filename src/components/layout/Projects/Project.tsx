import { useAppContext } from "../../../hooks/useAppContext";
import { Section } from "../../container/Section";
import { Title } from "../../text/Title";
import { ProjectCard } from "./ProjectCard";

export const Project = () => {
  const { isLargeScreen} = useAppContext();




  return (
    <Section>
      <div className="flex flex-col items-center justify-center gap-5">
        <section className="relative">
          <Title content="Projects" headingLevel="h2" />
          <img
            src="./assets/peace.png"
            className="absolute top-0 lg:top-3 -right-6 rotate-12 drop-shadow-custom will-change-transform"
            style={{
              width: "clamp(40px, 4vw, 100px)",
            }}
          />
        </section>
        <section className="w-[90%] gap-10 lg:gap-3 relative">
          <ProjectCard
            projectName="Taskly"
          />
          {isLargeScreen && (
            <div className="h-1 w-full bg-white mx-3 rounded-full" />
          )}
          <ProjectCard
            projectName="Bento-running"
          />
          {isLargeScreen && (
            <div className="h-1 w-full bg-white mx-3 rounded-full" />
          )}
        </section>
      </div>
    </Section>
  );
};
