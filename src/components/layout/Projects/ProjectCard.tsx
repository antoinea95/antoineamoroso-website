import { useGSAP } from "@gsap/react";
import { useAppContext } from "../../../hooks/useAppContext";
import { Title } from "../../text/Title";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap/all";
import projectsData from "../../../projects.json";
import { useNavigate } from "react-router-dom";

export const ProjectCard = ({ projectName }: { projectName: string }) => {
  const { isLargeScreen, setScrollY, transitionPlayed, setTransitionPlayed } =
    useAppContext();
  const navigate = useNavigate();
  const ImageRef = useRef<HTMLImageElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);
  const sectionRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const project = projectsData.projects.find(
    (proj) => proj.name === projectName
  );

  const initialStylesRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    if (sectionRef.current && !initialStylesRef.current) {
      const position = sectionRef.current.getBoundingClientRect();
      initialStylesRef.current = position;
    }
  }, [sectionRef]);

  const handleClick = () => {
    const position = sectionRef.current?.getBoundingClientRect();
    const buttonTitle = sectionRef.current?.childNodes;

    if (position && buttonTitle) {
      const { x, y } = position;
      initialStylesRef.current = position;

      if (isLargeScreen) gsap.set(ImageRef.current, { width: 0 });
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(sectionRef.current, {
            position: "fixed",
            top: 0,
            left: 0,
            x: 0,
            y: 0,
            zIndex: 30,
          });
          setScrollY(window.scrollY);
          navigate(`/${projectName}`);
          setTransitionPlayed(projectName);
        },
      });

      tl.to(buttonTitle, {
        keyframes: {
          x: [0, 30, "-100vw"],
        },
        ease: "steps(3)",
        duration: 0.6,
      })
        .to(sectionRef.current, {
          width: "100vw",
          height: "100vh",
          backgroundColor: "#5465FF",
          y: `-${y}px`,
          x: `-${x}px`,
          duration: 0.6,
          ease: "steps(3)",
        })
        .to(sectionRef.current, {
          backgroundColor: "#FFF0EB",
          duration: 0.3,
        });
    }
  };

  useEffect(() => {
    if (transitionPlayed === projectName && initialStylesRef.current) {
      const { width, height, left } = initialStylesRef.current;
      const buttonTitle = sectionRef.current?.childNodes;

      if (buttonTitle) {
        gsap.set(buttonTitle, { x: "-100vw" });

        gsap.set(sectionRef.current, {
          width: "100vw",
          height: "100vh",
          position: "fixed",
          backgroundColor: "#5465FF",
          top: 0,
          left: 0,
          zIndex: 30,
        });

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(sectionRef.current, {
              clearProps: "all",
              position: "static",
            });

            gsap.to(buttonTitle, {
              keyframes: {
                x: ["-100vw", 30, 0],
              },
              ease: "steps(5)",
              duration: 0.6,
            });
            setTransitionPlayed("");
          },
        });

        tl.to(sectionRef.current, {
          height: `${height}px`,
          width: `${width}px`,
          top: "50%",
          left: left,
          zIndex: 30,
          ease: "steps(7)",
          duration: 0.3,
        });
      }
    }
  }, [setTransitionPlayed, transitionPlayed, projectName]);

  useEffect(() => {
    if (project) {
      const timeOut = setTimeout(() => {
        if (activeIndex === project.pictures.length - 1) {
          setActiveIndex(0);
        } else {
          setActiveIndex((prev) => prev + 1);
        }
      }, 1000);

      return () => clearTimeout(timeOut);
    }
  }, [project, activeIndex]);

  const { contextSafe } = useGSAP(() => {
    if (isLargeScreen) {
      // Initial setup
      gsap.set(ImageRef.current, { width: 0, pointerEvents: "none" });
      xTo.current = gsap.quickTo(ImageRef.current, "x", { duration: 0.2 });
      yTo.current = gsap.quickTo(ImageRef.current, "y", { duration: 0.2 });
    }
  });

  const moveShape = contextSafe(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (xTo.current && yTo.current && isLargeScreen) {
        xTo.current(event.clientX);
        yTo.current(event.clientY);
        gsap.to(ImageRef.current, { width: 300, ease: "steps(1)" });
      }
    }
  );

  const handleMouseLeave = () => {
    if (isLargeScreen) {
      // Smoothly hide the image
      gsap.to(ImageRef.current, {
        width: 0,
        ease: "steps(1)",
        pointerEvents: "none",
      });
    }
  };

  return (
    <button
      className="w-full flex flex-col-reverse items-center lg:flex-row py-10 lg:py-0"
      ref={sectionRef}
      onClick={handleClick}
      onMouseMove={moveShape}
      onMouseLeave={handleMouseLeave}
    >
      <span className="w-full p-3 group flex justify-center lg:justify-start">
        <Title content={projectName} headingLevel="h3" />
      </span>
      <img
        src={project?.pictures[activeIndex]}
        alt={`${projectName} preview`}
        className="lg:fixed lg:-top-44 lg:-left-10 pointer-events-none w-2/3 lg:w-0 z-20"
        ref={ImageRef}
      />
    </button>
  );
};
