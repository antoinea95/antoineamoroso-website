import { useRef } from "react";
import { useAppContext } from "../../../hooks/useAppContext";
import { Section } from "../../container/Section";
import { Title } from "../../text/Title";
import { ProjectCard } from "./ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const Project = () => {
  const { isLargeScreen } = useAppContext();
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    ScrollTrigger.refresh();
    const cards = cardRef.current?.childNodes;
    let imageLoop: gsap.core.Tween | null = null;


    if (cards) {
      const titleCards = isLargeScreen
        ? [...cards]
            .filter((el) => (el as HTMLElement).localName === "button")
            .map((button) => {
              const arr = button.childNodes;
              if (arr) {
                const title = [...arr].filter(
                  (el) => (el as HTMLElement).localName === "span"
                );
                return title;
              }
            })
        : [...cards].filter((el) => (el as HTMLElement).localName === "button").map((button) => button.childNodes);
      const lines = [...cards].filter(
        (el) => (el as HTMLElement).localName === "div"
      );

      gsap.set(titleRef.current, { y: 100 });
      gsap.set(titleCards, { y: isLargeScreen ? 100 : 500 });
      gsap.set(lines, { x: "-100vw" });
      gsap.set(imageRef.current, {scale: 0})

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#project",
          start: `-=${window.innerHeight / 2}px`,
          end: "+=200",
          invalidateOnRefresh: true,
          markers: true,
          onEnter: () => {
            tl.restart();
          },
          onLeaveBack: () => {
            tl.reverse();
            if (imageLoop) tl.remove(imageLoop);
          },
        },
      });

      tl.to(titleRef.current, {
        keyframes: {
          y: [100, 75, 50, 25, 0, 25, 0],
          rotate: [-5, 5, -5, 5, -5, 5, 0],
        },
        ease: "steps(7)",
        duration: 0.6,
      }).to(
        imageRef.current,
        {
          keyframes: {
            scale: [0, 0.4, 0.6, 1, 1.2, 1.2, 1],
            rotate: [-5, 5, -5, 5, -5, 5, 0],

          },
          ease: "steps(7)",
          duration: 1,
        },
        ">-0.1"
      )
        .to(
          lines,
          {
            keyframes: {
              x: ["-100vw", "-75vw", "-50vw", "-25vw", 0, "5vw", 0],
            },
            duration: 0.6,
            ease: "steps(7)",
          },
          "<+0.3"
        )
        .to(titleCards, {
          keyframes: {
            y: [100, 75, 50, 25, 0, 25, 0],
            rotate: [-5, 5, -5, 5, -5, 5, 0],
          },
          ease: "steps(7)",
          duration: 0.6,
          onComplete: () => {
            imageLoop = gsap.to(imageRef.current, {
              keyframes: {
                rotate: [10, -10],
              },
              repeat: -1,
              duration: 0.6,
              ease: "steps(2)",
            });
          },
        });
    }
  });

  return (
    <Section>
      <div id="project" className="space-y-10">
        <section className="relative overflow-hidden w-fit flex items-center -space-x-3">
          <div ref={titleRef} className="overflow-hidden">
            <Title content="Projects" headingLevel="h2" />
          </div>
          <img
            src="./assets/peace.png"
            ref={imageRef}
            className="rotate-12 drop-shadow-custom"
            style={{
              width: "clamp(27px, 3vw, 80px)",
            }}
          />
        </section>
        <section className="gap-10 lg:gap-3 relative" ref={cardRef}>
          <ProjectCard projectName="Taskly" />
          {isLargeScreen && (
            <div className="h-3 w-full bg-primary border-[3px] border-white shadow-custom rounded-full" />
          )}
          <ProjectCard projectName="Bento-running" />
          {isLargeScreen && (
            <div className="h-3 w-full bg-primary border-[3px] border-white shadow-custom rounded-full" />
          )}
        </section>
      </div>
    </Section>
  );
};
