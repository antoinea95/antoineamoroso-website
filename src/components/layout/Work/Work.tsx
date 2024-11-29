import { Section } from "../../container/Section";
import { Title } from "../../text/Title";
import projectsData from "../../../projects.json";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../../hooks/useAppContext";
import { WorkCard } from "./WorkCard";
import gsap from "gsap";
import { WorkDetail } from "./WorkDetail";
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";

export const Work = () => {
  const works = projectsData.works;
  const [workActive, setWorkActive] = useState<number | null>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const timeLineRef = useRef<HTMLDivElement>(null);
  const { isLargeScreen } = useAppContext();
  const [hasPlayed, setHasPlayed] = useState(false);

  // Animation principale (timeline + ligne)
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#work",
        start: "top 30%",
        end: "top 20%",
        markers: true,
        toggleActions: "play none none reset",
        onLeaveBack: () => {
          setWorkActive(null)
        }
      },
      onComplete: () => {
        setHasPlayed(true);
      }
    });

    const animationDuration = 2;
    const animationEase = "steps(6)";
    const initialSize = isLargeScreen
      ? { width: 0 }
      : { scaleY: 0, transformOrigin: "top" };
    const finalSize = isLargeScreen ? { width: "100%" } : { scaleY: "100%" };

    tl.fromTo(
      timeLineRef.current,
      { y: 200 },
      {
        y: 0,
        duration: 0.6,
        ease: "steps(5)",
      }
    ).fromTo(
      timeRef.current,
      initialSize,
      {
        ...finalSize,
        duration: animationDuration,
        ease: animationEase,
      },
      "<+0.3"
    );
  }, [isLargeScreen]);

  return (
    <Section>
      <div
        className={`relative flex flex-col ${workActive ? "justify-start space-y-32" : "justify-evenly"} items-center h-full w-full`}
        id="work"
      >
        <Title titleText="Work" headingLevel="h1" trigger="#work" />

        <section className="flex flex-col lg:flex-row justify-between items-center w-full gap-10">
          {!workActive ? (
            <div
              className="flex flex-col lg:flex-row lg:items-center justify-between relative lg:flex-1 min-h-[500px] lg:min-h-0"
              ref={timeLineRef}
            >
              <div
                ref={timeRef}
                className="h-full min-h-[500px] lg:min-h-3 lg:h-3 w-3 lg:w-[100%] absolute left-1/2 -translate-x-1/2 lg:left-0 lg:-translate-x-0 lg:top-1/2 lg:-translate-y-1/2 bg-primary rounded-full -z-10"
                style={{
                  willChange: "width, height",
                }}
              />
              {works.map((work, index) => (
                <WorkCard
                  key={work.id}
                  work={work}
                  setWorkActive={setWorkActive}
                  hasPlayed={hasPlayed}
                  index={index + 1}
                />
              ))}
            </div>
          ) : (
            <div className="relative px-3 lg:px-10 flex flex-col w-full flex-1">
              <div className="absolute lg:top-1/2 lg:-translate-y-1/2 left-1/2 -translate-x-1/2 w-96 justify-between flex items-center px-5 lg:px-0">
                <button
                  className="w-5 h-5 rounded-full bg-primary text-secondary flex items-center justify-center"
                  onClick={() => {
                    setWorkActive(
                      workActive === 1 ? works.length : workActive - 1
                    );
                  }}
                >
                  <PiArrowLeftBold />
                </button>
                <button
                  className="w-5 h-5 rounded-full bg-primary text-secondary flex items-center justify-center"
                  onClick={() => {
                    setWorkActive(
                      workActive === works.length ? 1 : workActive + 1
                    );
                  }}
                >
                  <PiArrowRightBold />
                </button>
              </div>
              <WorkDetail
                key={workActive}
                work={works[workActive - 1]}
                setWorkActive={setWorkActive}
              />
            </div>
          )}
        </section>
      </div>
    </Section>
  );
};
