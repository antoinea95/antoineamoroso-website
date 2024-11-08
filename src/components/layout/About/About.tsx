import { useEffect, useRef } from "react";
import { Section } from "../../container/Section";
import { Title } from "../../text/Title";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Stroke } from "../../text/Stroke";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const aboutRef = useRef<HTMLParagraphElement>(null);
  const heartRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);



  // Animation GSAP pour le scroll
  useGSAP(() => {

    let heartLoop: gsap.core.Tween | null = null

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#trigger", // Déclencheur
        start: "-=200", // Déclenche l'animation quand le début de l'élément entre dans la fenêtre
        markers: true,
        end: "+=200",
        onEnter: () => {
          tl.restart();
        },
        onLeaveBack: () => {
          tl.reverse();
          if(heartLoop) tl.remove(heartLoop)
        },
      },
    });

    const sectionTitles = titleRef.current?.childNodes;
    const aboutElement = aboutRef.current;
    const childrens = aboutElement?.childNodes;

    if (sectionTitles && aboutElement && childrens) {
      const [titleLeft, titleRight] = sectionTitles;

      gsap.set([titleLeft, titleRight], {
        x: (i) => (i === 0 ? "-100vw" : "100vw"),
      });
      gsap.set(heartRef.current, { scale: 0 });
      gsap.set(aboutElement, { y: "100vh" }); // Positionne l'élément en dehors de la fenêtre

      const rotationFrames = [-5, 5, -5, 5, -5, 5];
      const transformValues = [
        "100vw",
        "70vw",
        "40vw",
        "10vw",
        "5vw",
        "0",
        "5vw",
        "0",
      ];

      const titles = [...childrens]
        .filter((el) => (el as HTMLElement).localName === "div")
        .map((title) => title.childNodes);
      gsap.set(titles, { y: 40 });

      tl.to(titleLeft, {
        keyframes: {
          x: transformValues.map((value) => `-${value}`),
          rotation: [...rotationFrames, -5, 0],
        },
        ease: "steps(8)",
        duration: 1,
      })
        .to(
          titleRight,
          {
            keyframes: {
              x: transformValues,
              rotation: [...rotationFrames, 5, 0],
            },
            ease: "steps(8)",
            duration: 1,
          },
          "<"
        )
        .to(
          heartRef.current,
          {
            keyframes: {
              scale: [0.2, 0.4, 0.6, 1, 1.2, 1.2, 1],
              rotate: [60, 120, 180, 240, 300, 360, 12],
            },
            ease: "steps(6)",
            duration: 1,
          },
          ">-0.1"
        )
        .to(
          aboutElement,
          {
            keyframes: {
              y: ["100vh", "70vh", "40vh", "10vh", "-10vh", "0vh"], // Animation du défilement
              rotation: [...rotationFrames, 0],
            },
            duration: 1,
            ease: "steps(7)",
          },
          "<-=0.6"
        )
        .to(
          titles,
          {
            keyframes: {
              y: [40, 20, 10, -10, 0],
              rotate: [-5, 5, -5, 0],
            },
            onComplete: () => {
              heartLoop =  gsap.to(heartRef.current, {
                keyframes: {
                  scale: [1, 1.2, 1, 1.1, 1, 1],
                },
                repeat: -1,
                duration: 0.8,
                ease: "steps(5)",
              });
            },
            duration: 1,
            ease: "steps(5)",
          },
          ">-0.2"
        );

    }
  });

  return (
    <Section>
      <div
        className="w-[80%] max-w-[1000px] min-h-[700px] h-full flex flex-col items-center justify-center gap-10 m-auto"
        id="trigger"
      >
        <section className="relative">
          <h1
            className="leading-none tracking-tight -space-x-2 lg:-space-x-5 relative flex items-center w-fit text-primary font-extrabold"
            style={{
              fontSize: "clamp(3rem, 8vw, 15rem)",
            }}
            ref={titleRef}
          >
            <span className="inline-flex relative p-[0.17em] ">
              ABOUT
              <Stroke name="ABOUT" />
            </span>
            <span className="inline-flex relative p-[0.17em]">
              ME
              <Stroke name="ME" />
            </span>
          </h1>
          <img
            src="./assets/heart.png"
            className="absolute top-2 lg:top-3 -right-3 z-10 drop-shadow-custom will-change-transform"
            style={{
              width: "clamp(40px, 7vw, 150px)",
            }}
            ref={heartRef}
          />
        </section>

        <p
          className="w-full px-4 py-4 leading-snug text-primary font-medium"
          ref={aboutRef}
        >
          A <Title headingLevel="span" content="passionate developper" /> with
          nearly two years of experience, I am deeply drawn to front-end
          development, combining my love for graphic design with my technical
          skills. <br />
          <br /> My expertise primarily focuses on{" "}
          <Title headingLevel="span" content="React" /> but I also explore
          technologies such as{" "}
          <Title headingLevel="span" content="Typescript" />, Gsap and Next.js
          to deliver innovative and high-performing solutions. Each project
          represents an exciting challenge that I approach with enthusiasm and{" "}
          <Title headingLevel="span" content="creativity." />
        </p>
      </div>
    </Section>
  );
};
