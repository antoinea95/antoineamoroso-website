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
      gsap.set(aboutElement, { y: 500,});

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
      tl.to(
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
    <Section>
      <div
        className="w-full h-full flex flex-col justify-between items-center"
        id="about"
      >
        <Title titleText="About" headingLevel="h1" trigger="#about" />

        {/* Paragraphe animé */}
        <div className="overflow-hidden p-10 flex items-center justify-center">
          <p
            className="leading-snug text-primary font-medium w-full sm:w-[90%]"
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
      </div>
    </Section>
  );
};
