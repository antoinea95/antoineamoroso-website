import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap/all";
import { TbCircleArrowUpRightFilled } from "react-icons/tb";
import projectsData from "../../../projects.json";
import { useAppContext } from "../../../hooks/useAppContext";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useNavigationContext } from "../../../hooks/useNavigationContext";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

/**
 * 
 * @param {string} props.projectName - Name of the project
 * @param {string} props.alt - Short description of the project
 * @param {number} props.number - index + 1 of the project to display a card number
 * @returns a card to navigate of the project / an hover effect wich display an overview picture of the project 
 */
export const ProjectCard = ({
  projectName,
  number,
}: {
  projectName: string;
  number: number;
}) => {


  const navigate = useNavigate();
  const { isLargeScreen } = useAppContext();
  const {t} = useTranslation();

  // To handle the page transition, return a state of the user navigation
  const { previousKey, currentKey } = useNavigationContext();

  // Refs for DOM element
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const project = projectsData.projects.find((proj) => proj.name === projectName);

  /**
   * Transition animation when navigating back
   */
  useEffect(() => {
    if (previousKey && previousKey !== currentKey) {
      const timeline = gsap.timeline();
      timeline
        .fromTo(
          sectionRef.current,
          { width: "100vw" },
          {
            width: 0,
            duration: 0.6,
            ease: "steps(3)",
          }
        )
        .fromTo(cardRef.current, {x: "-100vw", opacity: 0}, { x: 0, opacity: 1, duration: 0.6 });

      return () => {
        timeline.kill();
      };
    }
  }, [currentKey, previousKey]);

  /**
   * Change image of the overwiew every seconds
   */
  useEffect(() => {
    if (project) {
      const timeout = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % project.pictures.length);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [activeIndex, project]);

  /**
   * When hovering the card, picture is display + add a "mouse move" event to make the picture follow the mouse
   */
  const { contextSafe } = useGSAP();

  const moveShape = contextSafe((event: React.MouseEvent<HTMLButtonElement>) => {
    if (isLargeScreen) {
      gsap.to(imageRef.current, {
        x: event.clientX,
        y: -100,
        scale: 1,
      });
    }
  });

  const handleMouseLeave = () => {
    if (isLargeScreen) {
      gsap.to(imageRef.current, {
        scale: 0,
        ease: "steps(1)",
      });
    }
  };

  /**
   * Entry animation when scrolling on the homepage
   */
  useEffect(() => {
    gsap.set(buttonRef.current, { y: 200 });
  
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#projects",
        start: "top 30%",
        end: "top 20%",
        toggleActions: "play none none reset",
      },
    });
  
    // Pause the animation when navigate
    if (previousKey && currentKey !== previousKey) {
      timeline.pause(timeline.endTime())
    }
  
    timeline
      .fromTo(cardRef.current, {x: "-100vw", overflow: "hidden"}, {
        x: 0,
        duration: 0.6,
        ease: "steps(3)",
        delay: number / 10,
      })
      .fromTo(
        buttonRef.current,
        {y: 200},
        {
          keyframes: {
            rotate: [-5, 5, -5, 5, 0],
            y: isLargeScreen
              ? [200, 150, 100, 50, 0]
              : [500, 350, 200, 50, 0],
          },
          ease: "steps(5)",
          duration: 0.6,
        },
        "<+0.4"
      )
      .to(cardRef.current, { overflow: "visible", duration: 0.2 });
  
    return () => {
      timeline.kill();
    };
  }, [number, isLargeScreen, currentKey, previousKey]);

  /**
   * Handle click event to trigger the transition animation before navigate on the project page
   */
  const handleClick = () => {
    const timeline = gsap.timeline({
      onComplete: () => {
        navigate(`/${projectName}`, { state: { transition: true } });
      },
    });

    timeline
      .to(cardRef.current, {
        x: "-100vw",
        duration: 0.6,
        ease: "steps(3)",
      })
      .to(sectionRef.current, {
        width: "100vw",
        duration: 0.6,
        ease: "steps(3)",
      })
      .to(sectionRef.current, {
        backgroundColor: "#EDE8E4",
        duration: 0.6,
        ease: "steps(3)",
      });
  };

  return (
    <>
      <div
        className="h-screen w-0 bg-primary fixed left-0 top-0 z-50"
        ref={sectionRef}
      />
      <div
        className="border-b border-primary flex items-center pb-5 2xl:pb-8 pt-8 hover:bg-secondary max-w-[1400px] w-full"
        ref={cardRef}
      >
        <p className="absolute text-sm left-3 top-3">0{number}.</p>
        <button
          className="flex flex-col lg:flex-row lg:items-center justify-between pt-5 lg:py-0 w-full lg:pl-10 mx-auto px-3"
          onClick={handleClick}
          onMouseMove={moveShape}
          onMouseLeave={handleMouseLeave}
          ref={buttonRef}
        >
          <h3 className="text-left">{projectName}</h3>
          <p className="text-sm flex flex-col gap-2 lg:flex-row lg:items-center justify-between lg:w-1/4 pr-2">
            {t("projects." + project?.name + ".alt")}
            <TbCircleArrowUpRightFilled size={24} />
          </p>
        </button>
        <img
          src={project?.pictures[activeIndex]}
          alt={`${projectName} preview`}
          className="lg:absolute lg:top-[0] lg:-left-10 w-1/2 lg:w-1/3 max-w-[350px] lg:scale-0 z-50 stroke-two"
          ref={imageRef}
        />
      </div>
    </>
  );
};
