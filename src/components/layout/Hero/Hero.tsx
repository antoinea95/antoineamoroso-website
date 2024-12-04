import { useEffect, useRef } from "react";
import { useAppContext } from "../../../hooks/useAppContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { IconLink } from "../../cta/IconLink";
import { RiLinkedinFill } from "react-icons/ri";
import { TbBrandGithubFilled } from "react-icons/tb";
import { NavBar } from "../../nav/NavBar";
import { HeroPicture } from "./HeroPicture";
gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const { navRef, isLargeScreen } = useAppContext();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef?.current || !titleRef.current || !subTitleRef.current) return;
  
    const isAnimated = sessionStorage.getItem("hasAnimationPlayed");
    const scrollY = window.scrollY;
  
    const navElement = navRef.current;
    const titleElement = titleRef.current;
    const subtitleElement = subTitleRef.current;
    const [titleLeft, titleRight] = titleRef.current.childNodes;
  
    let timeline: gsap.core.Timeline | null = null; // Stocker l'instance de la timeline pour un nettoyage correct
  
    // Fonction pour récupérer l'animation du titre
    const getTitleAnimation = (isToLeft = false) => {
      const rotateFrames = [5, -5, 5, 0, 0];
      const xValues = [280, 187, 94, -10, 0];
      const keyframes = isLargeScreen
        ? {
            x: isToLeft ? xValues : xValues.map((val) => -val),
            rotate: rotateFrames,
          }
        : { y: [-80, -60, -40, -20, 0], rotate: rotateFrames };
  
      return { keyframes, duration: 0.6, ease: "steps(4)" };
    };
  
    // Positionnement initial des éléments
    const initializePositions = () => {
      gsap.set(titleRef.current, {
        y: isLargeScreen ? -30 : -80,
        visibility: "hidden",
      });
      gsap.set(subTitleRef.current, { y: -80, opacity: 0, zIndex: -1 });
      gsap.set(navElement, { y: -80 });
    };
  
    const playAnimations = () => {
      timeline = gsap.timeline({ delay: 1.2 });
  
      // Séquence principale d'animations
      timeline.to(titleElement, {
        visibility: "visible",
        duration: 0.2,
        ease: "none",
      });
  
      if (isLargeScreen) {
        timeline
          .to(titleLeft, getTitleAnimation(true), "<")
          .to(titleRight, getTitleAnimation(false), "<");
      } else {
        timeline.to(titleElement, getTitleAnimation(), "<");
      }
  
      timeline
        .to(titleElement, { y: 0, duration: 0.3, ease: "steps(2)" }, ">")
        .to(subtitleElement, { opacity: 1, duration: 0 }, "<+0.2")
        .to(
          subtitleElement,
          {
            keyframes: { "95%": { y: 20 }, "100%": { y: 0, zIndex: 1 } },
            duration: 0.5,
            ease: "steps(4)",
          },
          "<-0.2"
        )
        .to(
          navElement,
          {
            keyframes: {
              y: [-80, -60, -40, -20, 20, 0],
              rotate: [5, -5, 5, -5, 0],
            },
            duration: 0.6,
            ease: "steps(5)",
          },
          "<"
        );
    };
  
    const initAnimations = () => {
      if (!isAnimated && scrollY === 0) {
        initializePositions();
        playAnimations();
        sessionStorage.setItem("hasAnimationPlayed", "true");
      }
    };
  
    // Initialisation des animations après un délai
    const timeoutId = setTimeout(initAnimations, 50);
  
    // Nettoyage pour éviter les animations persistantes
    return () => {
      clearTimeout(timeoutId); // Nettoyer le timeout
      if (timeline) {
        timeline.kill(); // Arrêter et nettoyer la timeline
      }
      gsap.set([titleElement, subtitleElement, navElement], {
        clearProps: "all", // Supprimer les styles injectés par GSAP
      });
    };
  }, [isLargeScreen, navRef]);
  

  return (
    <section
      className="max-h-dvh h-dvh py-5 w-[95%] m-auto"
      id="hero-container"
    >
      <NavBar />
      <HeroPicture />
      <section
        id="hero"
        className="flex flex-col lg:gap-2 items-center justify-end lg:justify-center lg:h-full h-[95vh] sm:h-[85vh] min-h-[575px] lg:space-y-3 2xl:space-y-6 mt-3 w-fit lg:w-full mx-auto"
      >
        <h1
          className="flex items-center justify-center lg:w-full flex-wrap lg:flex-nowrap -space-y-3 sm:space-y-0 gap-2.5 lg:gap-[24%] 2xl:gap-[20%]"
          ref={titleRef}
        >
          <span className="will-change-auto">Antoine</span>
          <span className="will-change-auto">Amoroso</span>
        </h1>
        <section
          className="flex flex-col-reverse gap-3 lg:flex-row justify-between items-center flex-nowrap w-full lg:w-[97%] max-w-[1480px]"
          ref={subTitleRef}
        >
          <div className="flex items-center w-fit gap-2">
            <IconLink
              url="https://www.linkedin.com/in/antoine-amoroso-developpeur-web/"
              icon={RiLinkedinFill}
              content="LinkedIn"
            />
            <IconLink
              url="https://github.com/antoinea95"
              icon={TbBrandGithubFilled}
              content="Github"
            />
          </div>
          <p
            className="font-extralight text-primary tracking-tight text-xl uppercase"
            style={{
              fontSize: "clamp(1.2rem, 2vw, 2rem)",
            }}
          >
            front-end developer
          </p>
        </section>
      </section>
    </section>
  );
};
