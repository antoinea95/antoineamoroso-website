import { useParams } from "react-router-dom";
import projectsData from "../projects.json";
import { ProjectCaroussel } from "../components/layout/Projects/ProjectCaroussel";
import { ProjectHeader } from "../components/layout/Projects/ProjectHeader";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { iconMap } from "../utils/iconMap";

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
        <section className="flex flex-col lg:flex-row justify-between p-2 gap-10">
          <div className="lg:w-[50%] space-y-3">
            <p className="font-bold border-b pb-1 mb-3 text-lg lg:text-xl">
              About
            </p>
            <p className="text-sm lg:text-lg font-semibold">
              {project.summary}
            </p>
            <div>
              <p className="font-bold border-b pb-1 mb-3 text-lg lg:text-xl">
                Stack
              </p>
              <div className="flex items-center gap-5">
                {project.technos.map((techno) => {
                  const Icon = iconMap[techno.icon];
                  return (
                    <p
                      key={techno.icon}
                      className="text-xs flex flex-col items-center font-bold"
                    >
                      <Icon
                        size={30}
                        className="drop-shadow-custom overflow-visible z-10"
                        stroke="#f1f5f9"
                        paintOrder="stroke"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        style={{
                          strokeWidth: "clamp(2px, 0.3em, 5px)",
                        }}
                      />
                      {techno.name}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          {project.features && (
            <div className="text-xs lg:w-[50%]">
              <p className="font-bold border-b pb-1 mb-3 text-lg lg:text-xl">
                Main features
              </p>
              <ul className="space-y-5">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex flex-col text-xs">
                    <span className="font-bold text-sm">
                      {feature.split(":")[0]}
                    </span>
                    {feature.split(":")[1]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
        <ProjectCaroussel pictures={project.pictures} />
      </div>
    </main>
  );
};
