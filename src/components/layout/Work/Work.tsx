import { Section } from "../../container/Section";
import { Title } from "../../text/Title";
import projectsData from "../../../projects.json";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../../hooks/useAppContext";
import { WorkCard } from "./WorkCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Modal } from "../../container/Modal";
import { WorkDetail } from "./WorkDetail";

gsap.registerPlugin(ScrollTrigger)

/**
 * 
 * Display a timeline of my work Experience
 */
export const Work = () => {

  const works = projectsData.works;
  const timeRef = useRef<HTMLDivElement>(null);
  const timeLineRef = useRef<HTMLDivElement>(null);
  const { isLargeScreen } = useAppContext();

  // Handle modal navigation
  const [workActive, setWorkActive] = useState<number | null>(null);

  const handleNext = () => {
    if (workActive) {
      gsap.to(`#work-${workActive}`, {
        x: "100vw",
        keyframes: {
          rotate: [5, -5, 5, -5, 5, 0],
        },
        ease: "steps(6)",
        duration: 0.6,
        onComplete: () => {
          setWorkActive(() =>
            workActive === works.length ? 1 : workActive + 1
          );
        },
      });
    }
  };

  const handlePrev = () => {
    if (workActive) {
      gsap.to(`#work-${workActive}`, {
        x: "-100vw",
        keyframes: {
          rotate: [5, -5, 5, -5, 5, 0],
        },
        ease: "steps(6)",
        duration: 0.6,
        onComplete: () => {
          setWorkActive(() =>
            workActive === 1 ? works.length : workActive - 1
          );
        },
      });
    }
  };

  // Animation of the pictures
  useEffect(() => {
    ScrollTrigger.refresh()
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#work",
        start: "top 80%",
        end: "top 20%",
        toggleActions: "restart none none none",
        onLeaveBack: () => {
          infiniteAnimation.pause();
        },
      },
    });

    tl.fromTo(
      "#mac",
      { y: 30, scale: 0 },
      {
        y: 0,
        keyframes: {
          rotate: [-5, 5, -5, 5, 0],
          scale: [0, 0.3, 0.6, 1.2, 2, 1],
        },
        duration: 0.6,
        delay: 0.5,
        ease: "steps(6)",
      }
    );

    const infiniteAnimation = gsap.to("#mac", {
      y: -5,
      keyframes: {
        rotate: [-10, 10],
      },
      duration: 0.8,
      ease: "steps(2)",
      repeat: -1,
      paused: true,
    });

    tl.eventCallback("onComplete", () => {
      infiniteAnimation.play();
    });

    return () => {
      tl.kill(); 
      infiniteAnimation.kill(); 
      gsap.killTweensOf("#mac");
    };
  }, []);

  // Entry animation of the timeline
  useEffect(() => {
    const timeElement = timeRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#work",
        start: "top 30%",
        end: "top 20%",
        toggleActions: "play none none reset",
      },
    });

    const animationDuration = 2;
    const animationEase = "steps(6)";
    const initialSize = isLargeScreen
      ? { width: 0 }
      : { scaleY: 0, transformOrigin: "top" };
    const finalSize = isLargeScreen ? { width: "100%" } : { scaleY: "100%" };

    tl.fromTo(
      timeElement,
      initialSize,
      {
        ...finalSize,
        duration: animationDuration,
        ease: animationEase,
      },
      "<+0.3"
    );

    return () => {
      tl.kill(); 
      gsap.killTweensOf(timeElement);
    };
  }, [isLargeScreen]);

  return (
    <Section id="work">
      <div className="flex items-center relative px-2 py-1 -space-x-2">
        <Title titleText="Work" headingLevel="h2" trigger="#work" />
        <img src="./assets/mac.png" className="w-20 lg:w-24 stroke-two" id="mac" alt="Illustation of an Imac in a retro cartoon style" />
      </div>
      <section className="flex flex-col lg:flex-row justify-between items-center w-full max-w-[1400px] gap-10">
        <div
          className="flex flex-col lg:flex-row lg:items-center justify-between relative lg:flex-1 min-h-[500px] lg:min-h-0"
          ref={timeLineRef}
        >
          <div
            ref={timeRef}
            className="h-full min-h-[500px] lg:min-h-3 lg:h-3 w-3 lg:w-[100%] max-w-[1400px] absolute left-1/2 -translate-x-1/2 lg:left-0 lg:-translate-x-0 lg:top-1/2 lg:-translate-y-1/2 bg-primary rounded-full"
            style={{
              willChange: "width, height",
            }}
          />
          {works.map((work, index) => (
            <WorkCard
              key={work.id}
              work={work}
              setWorkActive={setWorkActive}
              index={index + 1}
            />
          ))}
        </div>
      </section>
      <Modal
        workActive={workActive}
        onClose={() => setWorkActive(null)}
        handleNext={handleNext}
        handlePrev={handlePrev}
      >
        <WorkDetail work={workActive ? works[workActive - 1] : null} />
      </Modal>
    </Section>
  );
};
