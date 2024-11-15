import { useParams } from "react-router-dom";
import projectsData from "../projects.json";
import { ProjectCaroussel } from "../components/layout/Projects/ProjectCaroussel";
import { ProjectHeader } from "../components/layout/Projects/ProjectHeader";

export type ProjectType = {
  name: string;
  url: string;
  technos: {
    icon: string;
    name: string;
  }[];
  backgroundColor: string;
  pictures: string[];
  content: string;
};

export const ProjectPage = () => {
  const { projectName } = useParams();
  const project = projectsData.projects.find(
    (proj) => proj.name === projectName
  );

  if (!project) {
    return <p>Project not found</p>;
  }

  return (
    <main className="py-10 flex flex-col items-center mx-auto gap-5 w-[90vw]">
      <ProjectHeader project={project} />
      <section className="flex flex-col-reverse lg:flex-col gap-5 lg:gap-2">
        <p className="text-sm lg:text-base text-primary font-semibold">
          {project.content}
        </p>
        <ProjectCaroussel pictures={project.pictures} />
      </section>
    </main>
  );
};
