import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useAppContext } from "../../../hooks/useAppContext";

gsap.registerPlugin(ScrollTrigger);

export const HeroPicture = () => {
  const { navRef, isLargeScreen } = useAppContext(); // Assuming this provides the navbar ref
  const images = useMemo(() => ["./assets/big-head.png", "./assets/big-head-2.png"], []);
  const heroPictureRef = useRef<HTMLDivElement>(null);
  const currentImageIndex = useRef(0);

  // Preload images
  useEffect(() => {
    images.forEach((path) => {
      const img = new Image();
      img.src = path;
    });
  }, [images]);

  // Image rotation for stop-motion effect
  useEffect(() => {
    let lastTime = 0;
    const frameDuration = 900; // Durée d'une image (ms)
  
    const loop = (currentTime: number) => {
      if (currentTime - lastTime >= frameDuration) {
        lastTime = currentTime;
        currentImageIndex.current =
          (currentImageIndex.current + 1) % images.length;
  
        // Mise à jour de l'image
        if (heroPictureRef.current) {
          const imgElement = heroPictureRef.current.querySelector("img");
          if (imgElement) {
            imgElement.src = images[currentImageIndex.current];
          }
        }
      }
      animationId = requestAnimationFrame(loop);
    };
  
    let animationId = requestAnimationFrame(loop);
  
    return () => cancelAnimationFrame(animationId); // Nettoyage
  }, [images]); // Recrée uniquement si `images` change

  

  useEffect(() => {
    const heroElement = heroPictureRef.current;
    const picture = document.getElementById("hero-picture");
    const navElement = navRef?.current;
  
    if (!picture || !heroElement || !navElement) return;
  
    const isAnimated = sessionStorage.getItem("hasAnimationPlayed");
    const scrollY = window.scrollY;
  
    let entryAnimation : gsap.core.Tween | null = null; // Stocker l'animation d'entrée
    let scrollAnimation : globalThis.ScrollTrigger | null = null; // Stocker ScrollTrigger
  
    const animateEntry = () => {
      entryAnimation = gsap.fromTo(
        heroElement,
        { scale: 0 },
        {
          keyframes: {
            rotate: [0, -20, 20, -20, 0],
            scale: [0, 0.5, 1],
          },
          ease: "steps(6)",
          duration: 1,
          willChange: "transform, width",
          onComplete: () => {
            sessionStorage.setItem("hasAnimationPlayed", "true");
          },
        }
      );
      return entryAnimation; // Retourner l'animation pour chaîner les appels
    };
  
    const setupScrollAnimation = () => {
      scrollAnimation = ScrollTrigger.create({
        trigger: "#hero-container",
        start: "top top",
        end: "+=180",
        scrub: 0.3,
        invalidateOnRefresh: true,
        animation: gsap
          .timeline()
          .to(heroElement, {
            keyframes: {
              rotate: [0, -20, 20, -20, 0],
              scale: [1, 0.8, 0.6, 0.4, 0.2],
            },
            yPercent: -45,
            duration: 1,
            ease: "steps(5)",
          })
          .to(
            navElement,
            {
              keyframes: {
                gap: ["8rem", "3rem", `${picture.offsetWidth * 0.2}px`],
                rotate: [-5, 5, 0],
              },
              duration: 1,
              ease: "steps(3)",
            },
            "<+0.6"
          ),
      });
    };
  
    const initAnimations = () => {
      if (scrollAnimation) {
        scrollAnimation.kill(); // Nettoyer les anciens triggers
      }
  
      if (!isAnimated && scrollY === 0) {
        animateEntry().then(setupScrollAnimation);
      } else if (isAnimated) {
        setupScrollAnimation();
      }
    };
  
    // Initialisation des animations après un délai
    const timeoutId = setTimeout(initAnimations, 50);
  
    return () => {
      clearTimeout(timeoutId); // Nettoyer le timeout
      if (entryAnimation) {
        entryAnimation.kill(); // Nettoyer l'animation d'entrée
      }
      if (scrollAnimation) {
        scrollAnimation.kill(); // Nettoyer ScrollTrigger
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Nettoyage global
    };
  }, [navRef, isLargeScreen]); // Dépendances pertinentes
  
  

  return (
    <div
      className="pointer-events-none fixed flex items-center justify-center h-screen w-screen max-h-[75vh] lg:max-h-dvh z-10 lg:scale-0 left-0 top-5"
      ref={heroPictureRef}
      id="heroPicture-container"
    >
      <img
        src="./assets/big-head.png"
        className="object-cover w-[75%] sm:w-[60%] lg:w-[30%] 2xl:w-[25%] max-w-[500px] will-change-auto stroke lg:-translate-x-10"
        alt="Hero Animation"
        id="hero-picture"
      />
    </div>
  );
};
