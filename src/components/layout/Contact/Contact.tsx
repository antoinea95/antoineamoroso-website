import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleText = "Let's work together";

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

    // Animation principale contrôlée par ScrollTrigger
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

    // Animation infinie séparée (démarrage après la timeline principale)
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

    // Démarrer l'animation infinie à la fin de la timeline
    tl.eventCallback("onComplete", () => {
      infiniteAnimation.play();
    });

    return () => {
      tl.kill(); // Nettoyer la timeline
      infiniteAnimation.kill(); // Nettoyer l'animation infinie
      gsap.killTweensOf("#rock"); // Nettoyer les tweens restants
    };
  }, []);

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
        tl.kill()
      }
    }
  }, []);

  return (
    <footer className="flex flex-col w-screen pb-2 relative" id="contact">
      <h1
        className="text-center overflow-hidden pt-10 flex flex-wrap items-center justify-center gap-4 relative"
        ref={titleRef}
      >
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
        <img
          src="./assets/rock.png"
          className=" w-10 lg:w-16 stroke-two"
          id="rock"
        />
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
    </footer>
  );
};
