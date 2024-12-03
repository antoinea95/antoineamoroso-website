import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Skills } from "../Skills/Skills";
import { Section } from "../../container/Section";
import { Title } from "../../text/Title";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const aboutRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const aboutElement = aboutRef.current;

    if (aboutElement) {
      // Position de départ pour le paragraphe
      gsap.set(aboutElement, { y: 500 });

      // Animation principale
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
          end: "top 20%",
          toggleActions: "restart none none reset",
        },
      });

      // Animation du paragraphe (décalée)
      tl.fromTo(
        "#flower",
        { y: 30, scale: 0 },
        {
          y: 0,
          keyframes: {
            rotate: [-5, 5, -5, 5, 0],
            scale: [0, 0.3, 0.6, 1.2, 2, 1]
          },
          duration: 0.6,
          delay: 0.5,
          ease: "steps(6)",
          onComplete: () => {
            gsap.to("#flower", {
              y: -5,
              rotate: 180,
              duration: 0.8,
              ease: "steps(2)",
              repeat: -1,
            });
          },
        }
      ).to(
        aboutElement,
        {
          keyframes: {
            rotation: [-5, 5, -5, 5, -5, 5, 0], // Balancement
          },
          y: 0, // Monte doucement à sa position
          duration: 1,
          ease: "steps(5)",
        },
        "<+=0.5" // Démarre 0.5s après la fin du titre
      );
    }
  }, []);

  return (
    <Section id="about">
      <div className="flex items-center relative">
        <Title titleText="About" headingLevel="h1" trigger="#about" />
        <img
          src="./assets/flower.png"
          className=" w-16 lg:w-20 stroke-two"
          id="flower"
        />
      </div>

      <div className="overflow-hidden flex items-center justify-center">
        <p
          className="leading-snug font-medium w-full sm:w-[90%]"
          ref={aboutRef}
        >
          A passionate developer with nearly two years of experience, I am
          deeply drawn to front-end development, combining my love for graphic
          design with my technical skills. <br />
          <br /> My expertise primarily focuses on React but I also explore
          technologies such as TypeScript, Gsap and Next.js to deliver
          innovative and high-performing solutions. Each project represents an
          exciting challenge that I approach with enthusiasm and creativity.
        </p>
      </div>
      <Skills />
    </Section>
  );
};
