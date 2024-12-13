import { useParams } from "react-router-dom";
import projectsData from "../projects.json";
import { ProjectCaroussel } from "../components/layout/Projects/ProjectCaroussel";
import { ProjectHeader } from "../components/layout/Projects/ProjectHeader";
import { useEffect } from "react";
import { ProjectContent } from "../components/layout/Projects/ProjectContent";

export type ProjectType = {
  name: string;
  url: string;
  technos: {
    icon: string;
    name: string;
  }[];
  pictures: string[];
  summary: string;
  features: string[];
};

/**
 * Page to display project information
 */
export const ProjectPage = () => {

  // Get the projectName in URL and find the project in JSON data
  const { projectName } = useParams();
  const project = projectsData.projects.find(
    (proj) => proj.name === projectName
  );


// Reset scroll when navigating on the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  if (!project) {
    return <p>Project not found</p>;
  }



  return (
    <main className="py-10 flex flex-col items-center mx-auto gap-5 w-[90vw]">
      <ProjectHeader project={project} />
      <div className="flex flex-col gap-10 overflow-hidden">
        <ProjectContent id={project.name} stack={project.technos} features={project.features} />
        <ProjectCaroussel pictures={project.pictures} />
      </div>
    </main>
  );
};
