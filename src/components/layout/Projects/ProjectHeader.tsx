import { TbArrowUpRight} from "react-icons/tb";
import { IconLink } from "../../cta/IconLink";
import { ProjectType } from "../../../pages/ProjectPage";
import { useEffect, useRef } from "react";
import gsap from "gsap";


/**
 * 
 * @param {ProjectType} project
 * @returns Project header : Name of the project with a link to see live project
 */
export const ProjectHeader = ({ project }: { project: ProjectType }) => {

  // Ref for GSAP
  const headerRef = useRef<HTMLDivElement>(null);


  // Enter animation
  useEffect(() => {
    const rotateFrames = [5, -5, 5, -5, 5, 0];
    const animation = gsap.fromTo(
      headerRef.current,
      { x: "-100vw" },
      {
        keyframes: {
          rotate: rotateFrames,
          x: ["-100vw", -250, 0, 100, 0],
        },
        ease: "steps(5)",
        duration: 1,
        delay: 0.3,
      }
    );

    return () => {
      animation.kill();
    }
  }, []);

  return (
    <header className="flex flex-col lg:flex-row items-center lg:justify-between w-full gap-6">
      <div className="flex gap-2 -translate-x-[100vw]" ref={headerRef}>
        <h1>{project.name}</h1>
        <IconLink
          content="Live"
          url={project.url}
          icon={TbArrowUpRight}
        />
      </div>
    </header>
  );
};
