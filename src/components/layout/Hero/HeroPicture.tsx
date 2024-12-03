import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useAppContext } from "../../../hooks/useAppContext";

gsap.registerPlugin(ScrollTrigger);

export const HeroPicture = () => {
  const { navRef, isLargeScreen } = useAppContext(); // Assuming this provides the navbar ref
  const images = ["./assets/big-head.png", "./assets/big-head-2.png"];
  const heroPictureRef = useRef<HTMLDivElement>(null);
  const currentImageIndex = useRef(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null); // To store the ScrollTrigger

  // Preload images
  useEffect(() => {
    images.forEach((path) => {
      const img = new Image();
      img.src = path;
    });
  });

  // Image rotation for stop-motion effect
  useEffect(() => {
    let lastTime = 0;
    const frameDuration = 900; // 900ms per frame
    const loop = (currentTime: number) => {
      if (currentTime - lastTime >= frameDuration) {
        lastTime = currentTime;
        currentImageIndex.current =
          (currentImageIndex.current + 1) % images.length;

        // Update image without triggering re-renders
        if (heroPictureRef.current) {
          heroPictureRef.current.querySelector("img")!.src =
            images[currentImageIndex.current];
        }
      }
      requestAnimationFrame(loop);
    };

    const animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  });

  useEffect(() => {
    const heroElement = heroPictureRef.current;
    const picture = document.getElementById("hero-picture");
    const navElement = navRef?.current;

    if (!picture || !heroElement || !navElement) return;

    const isAnimated = sessionStorage.getItem("hasAnimationPlayed");

    // Animation d'entrée
    const animateEntry = () => {
      return gsap.fromTo(
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
    };

    // Animation au scroll
    const scrollAnimation = () => {
      scrollTriggerRef.current = ScrollTrigger.create({
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
            left: "50%",
            duration: 1,
            ease: "steps(5)",
          }).to(heroElement, {
            zIndex: 10,
            duration: 0.2,
          }, "<+0.6")
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
            "<"
          ),
      });
    };

    // Initialisation des animations
    const initAnimations = () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }

      if (!isAnimated) {
        animateEntry().then(scrollAnimation);
      } else {
        scrollAnimation();
      }
    };

    // Déclenche les animations après un léger délai (pour éviter le glitch)
    setTimeout(initAnimations, 50);

    // Nettoyage
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [navRef, isLargeScreen]);

  return (
    <div
      className="fixed flex items-center justify-center h-screen w-screen max-h-[75vh] lg:max-h-dvh z-[1] left-1/2 lg:left-[48%] 2xl:left-[47.5%] -translate-x-1/2 lg:scale-0"
      ref={heroPictureRef}
      id="heroPicture-container"
    >
      <img
        src="./assets/big-head.png"
        className="object-cover w-[75%] sm:w-[60%] lg:w-[30%] max-w-[600px] will-change-auto stroke"
        alt="Hero Animation"
        id="hero-picture"
      />
    </div>
  );
};
