import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Section } from "../../container/Section";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleText = "Let's work together";

  useEffect(() => {
    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll(".letter");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#work",
          start: "top -10%",
          end: "bottom 20%",
          toggleActions: "restart none none reset",
        },
      });
      tl.fromTo(
        "#contact",
        { y: 200 },
        { y: 0, ease: "steps(6)", duration: 1 }
      ).fromTo(
        letters,
        { y: 300, scale: 0 },
        {
          keyframes: {
            scale: [0, 0.5, 1.4, 1],
            y: [100, 50, -10, 0],
            rotate: [-10, 10, -10, 10, 0],
          },
          stagger: 0.05,
          duration: 1,
          ease: "steps(10)",
        }, "<"
      );
    }
  }, []);

  return (
    <Section id="contact">
      <div className="flex flex-col w-screen pb-2 relative">
        <h1 className="text-center overflow-hidden pt-10 flex flex-wrap items-center justify-center gap-4" ref={titleRef}>
          {titleText.split(" ").map((word, wordIndex) => (
            <span className="flex flex-nowrap" key={`word-${wordIndex}`}>
              {word.split("").map((letter, letterIndex) => (
                <span
                  className="letter inline-block"
                  key={`letter-${wordIndex}-${letterIndex}`}
                >
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Liens sociaux */}
        <div
          className="flex items-center justify-center flex-wrap gap-5 flex-1 font-extralight text-sm w-full my-5 text-primary"
          id="social-link"
        >
          <a
            target="_blank"
            href="https://linkedin.com/in/antoine-amoroso-developpeur-web"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
          <a
            target="_blank"
            href="https://github.com/antoinea95"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            target="_blank"
            href="https://www.malt.fr/profile/antoineamoroso"
            rel="noopener noreferrer"
          >
            Malt
          </a>
          <a
            target="_blank"
            href="mailto:antoineamr95@gmail.com"
            rel="noopener noreferrer"
          >
            Mail
          </a>
        </div>

        {/* Footer */}
        <small className="font-extralight text-[9px] w-full text-center text-primary">
          Design & Developed by Antoine Amoroso - 2024
        </small>
      </div>
    </Section>
  );
};
