import { TbArrowUpRight} from "react-icons/tb";
import { IconLink } from "../../cta/IconLink";
import { ProjectType } from "../../../pages/ProjectPage";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const ProjectHeader = ({ project }: { project: ProjectType }) => {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const rotateFrames = [5, -5, 5, -5, 5, 0];
    gsap.fromTo(
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
  });

  return (
    <header className="flex flex-col lg:flex-row items-center lg:justify-between w-full gap-6">
      <div className="flex gap-2" ref={headerRef}>
        <h2>{project.name}</h2>
        <IconLink
          content="Live"
          url={project.url}
          icon={TbArrowUpRight}
        />
      </div>
    </header>
  );
};
