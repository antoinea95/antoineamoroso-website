import { useParams } from "react-router-dom";
import projectsData from "../projects.json";
import { ProjectCaroussel } from "../components/layout/Projects/ProjectCaroussel";
import { ProjectHeader } from "../components/layout/Projects/ProjectHeader";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
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

export const ProjectPage = () => {
  const contentRef = useRef<HTMLElement>(null);
  const { projectName } = useParams();
  const project = projectsData.projects.find(
    (proj) => proj.name === projectName
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Référence pour stocker l'animation
  const reverseAnimationRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const contentElements = contentRef.current?.childNodes;
    if (contentElements) {
      // Définir l'animation principale
      const animation = gsap.timeline();
      animation.set(contentElements, { y: "100vh" });
      animation.to(contentElements, {
        keyframes: {
          rotate: [5, -5, 5, -5, 5, 0],
          y: ["100vh", 500, 250, 0, 100, 0],
        },
        ease: "steps(6)",
        duration: 1,
        delay: 0.6,
      });

      // Stocke l'animation pour qu'elle soit réversible
      reverseAnimationRef.current = animation;
    }
  });

  if (!project) {
    return <p>Project not found</p>;
  }

  return (
    <main className="py-10 flex flex-col items-center mx-auto gap-5 w-[90vw]">
      <ProjectHeader project={project} />
      <div className="flex flex-col gap-10 overflow-hidden">
        <ProjectContent summary={project.summary} stack={project.technos} features={project.features} />
        <ProjectCaroussel pictures={project.pictures} />
      </div>
    </main>
  );
};
