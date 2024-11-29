import { TbCircleArrowUpRightFilled } from "react-icons/tb";
import { IconLink } from "../../cta/IconLink";
import { Techno } from "../../text/Techno";
import { ProjectType } from "../../../pages/ProjectPage";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const ProjectHeader = ({
  project
}: {
  project: ProjectType
}) => {

  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {

    const headerElements = headerRef.current?.childNodes;
    const rotateFrames = [5, -5, 5, -5, 5, 0];

    if(headerElements) {
      const [title, technos] = headerElements;
      gsap.set(title, {x: "-100vw"});
      gsap.set(technos, {x: "100vw"});

      const tl = gsap.timeline();
      tl.to(title, {
        keyframes: {
          rotate: rotateFrames,
          x: ["-100vw", -250, 0, 100, 0]
        },
        ease: "steps(5)",
        duration: 1,
        delay: 0.3
      }).to(technos, {
        keyframes: {
          rotate: rotateFrames,
          x: ["100vw", 250, 0, -100, 0]
        },
        ease: "steps(5)",
        duration: 1,
      }, "<")

    }

  })



  return (
    <header className="flex flex-col lg:flex-row items-center lg:justify-between w-full gap-6" ref={headerRef}>
       <div className="flex">
        <h2>{project.name}</h2>
        <IconLink
          content="View live"
          url={project.url}
          icon={TbCircleArrowUpRightFilled}
        />
      </div>
    </header>
   
  );
};
