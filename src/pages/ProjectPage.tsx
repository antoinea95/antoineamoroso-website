import { useParams } from "react-router-dom";
import projectsData from "../projects.json";
import { ProjectCaroussel } from "../components/layout/Projects/ProjectCaroussel";
import { ProjectHeader } from "../components/layout/Projects/ProjectHeader";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAppContext } from "../hooks/useAppContext";

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
  const { setTransitionPlayed } = useAppContext();
  const contentRef = useRef<HTMLElement>(null);
  const { projectName } = useParams();
  const project = projectsData.projects.find(
    (proj) => proj.name === projectName
  );

  // Référence pour stocker l'animation
  const reverseAnimationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (projectName) {
      setTransitionPlayed(projectName);
    }
    window.scrollTo(0, 0);
  }, [projectName, setTransitionPlayed]);

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
      <section
        className="flex flex-col-reverse lg:flex-col gap-5 lg:gap-2 overflow-hidden"
        ref={contentRef}
      >
        <p className="text-sm lg:text-base text-primary font-semibold">
          {project.content}
        </p>
        <ProjectCaroussel pictures={project.pictures} />
      </section>
    </main>
  );
};
