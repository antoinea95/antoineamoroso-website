import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

/**
 * 
 * Footer of the home page
 */
export const Contact = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const {t} = useTranslation();
  const titleText = t("texts.Let's work together");

  // Picture animation
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "-150% 80%",
        end: "top 20%",
        toggleActions: "restart none none reset",
        onLeaveBack: () => {
          infiniteAnimation.pause();
        },
      },
    });

    tl.fromTo(
      "#rock",
      { scale: 0, y: 200 },
      {
        scale: 1,
        y: -25,
        x: -20,
        duration: 0.6,
        delay: 0.9,
        ease: "steps(4)",
      }
    );

    const infiniteAnimation = gsap.to("#rock", {
      rotateX: 20,
      keyframes: {
        rotate: [-5, 5],
      },
      duration: 0.6,
      repeat: -1,
      ease: "steps(4)",
      paused: true,
    });

    tl.eventCallback("onComplete", () => {
      infiniteAnimation.play();
    });

    return () => {
      tl.kill();
      infiniteAnimation.kill();
      gsap.killTweensOf("#rock");
    };
  }, [titleText]);

  // Entry animation
  useEffect(() => {
    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll(".letter");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#contact",
          start: "-150% 80%",
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
        },
        "<"
      );

      return () => {
        tl.kill();
        gsap.killTweensOf(letters);
      };
    }
  }, [titleText]);

  return (
    <footer className="flex flex-col w-screen pb-2 relative" id="contact">
      <h2
        className="text-center overflow-hidden pt-10 flex flex-wrap items-center justify-center gap-2 lg:gap-4 relative"
        ref={titleRef}
      >
        {titleText.split(" ").map((word, wordIndex) => (
          <span className="inline-flex flex-nowrap relative w-fit py-3" key={`word-${wordIndex}`}>
            {word.split("").map((letter, letterIndex) => (
              <span
                className="letter"
                key={`letter-${wordIndex}-${letterIndex}`}
              >
                {letter}
              </span>
            ))}
            {wordIndex === titleText.split(" ").length - 1 && (
              <img
                src="./assets/rock.png"
                className=" w-8 lg:w-16 stroke-two absolute -right-8 lg:-right-16 lg:-top-3"
                id="rock"
                alt="Illustation of an hand wich do a rock sign in a retro cartoon style"
              />
            )}
          </span>
        ))}
      </h2>

      {/* Liens sociaux */}
      <div
        className="flex items-center justify-center flex-wrap gap-5 flex-1 font-extralight text-sm w-full my-5 text-primary"
        id="social-link"
      >
        <a
          target="_blank"
          href="https://linkedin.com/in/antoine-amoroso-developpeur-web"
          rel="noopener noreferrer"
          aria-label="Link to Linkedin"
        >
          Linkedin
        </a>
        <a
          target="_blank"
          href="https://github.com/antoinea95"
          rel="noopener noreferrer"
          aria-label="Link to Github"
        >
          Github
        </a>
        <a
          target="_blank"
          href="https://www.malt.fr/profile/antoineamoroso"
          rel="noopener noreferrer"
          aria-label="Link to Malt"
        >
          Malt
        </a>
        <a
          target="_blank"
          href="mailto:antoineamr95@gmail.com"
          rel="noopener noreferrer"
          aria-label="Send me an email"
        >
          Mail
        </a>
      </div>

      {/* Footer */}
      <small className="font-extralight text-[9px] w-full text-center text-primary">
        Design & Developed by Antoine Amoroso - 2024
      </small>
    </footer>
  );
};
