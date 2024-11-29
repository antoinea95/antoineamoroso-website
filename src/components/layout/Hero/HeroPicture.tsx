import { useEffect, useRef } from "react";
import { useAppContext } from "../../../hooks/useAppContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const HeroPicture = () => {
  const { isLargeScreen, navRef } = useAppContext();
  const images = ["./assets/big-head.png", "./assets/big-head-2.png"];

  const heroPictureRef = useRef<HTMLDivElement>(null);
  const currentImageIndex = useRef(0);
  const hasAnimationPlayed = useRef(sessionStorage.getItem("hasAnimationPlayed") === "true");

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
        currentImageIndex.current = (currentImageIndex.current + 1) % images.length;

        // Update image without triggering re-renders
        if (heroPictureRef.current) {
          heroPictureRef.current.querySelector("img")!.src = images[currentImageIndex.current];
        }
      }
      requestAnimationFrame(loop);
    };

    const animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  });

  // GSAP animation logic
  const initScrollAnimations = () => {
    if (!navRef?.current || !heroPictureRef.current) return;

    const navElement = navRef.current;
    const heroElement = heroPictureRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroElement,
        start: "top top",
        end: "+=180",
        invalidateOnRefresh: true,
        scrub: 0.3,
      },
    });

    tl.to(heroElement, {
      keyframes: {
        rotate: [0, -20, 20, -20, 0],
        maxHeight: ["100vh", "75vh", "50vh", "25vh", "80px"],
      },
      width: isLargeScreen ? "6%" : "20%",
      left: "50%",
      zIndex: 20,
      marginBottom: "auto",
      duration: 1,
      ease: "steps(5)",
      willChange: "transform, maxHeight", // Informs the browser
    }).to(heroElement, {
      maxWidth: "80px",
      duration: 0.2,
      ease: "steps(1)",
    }, "<+0.7").to(navElement, {
      keyframes: {
        gap: ["8rem", "3rem", "80px"],
        rotate: [-5, 5, 0],
      },
      duration: 1,
      ease: "steps(3)",
    }, "<");

    if (hasAnimationPlayed.current) {
      ScrollTrigger.update();
    }
  };

  useGSAP(() => {
    ScrollTrigger.refresh();
    const heroSectionTop = heroPictureRef.current?.offsetTop;

    gsap.set(heroPictureRef.current, {
      xPercent: -50,
      left: "48%",
      willChange: "transform, width, max-height",
    });

    // Trigger animation on load
    if (heroSectionTop && !hasAnimationPlayed.current) {
      gsap.to(heroPictureRef.current, {
        keyframes: {
          width: isLargeScreen
            ? ["1%", "7.5%", "15%", "22.5%", "35%", "30%"]
            : ["1%", "20%", "35%", "50%", "65%", "60%"],
          rotate: [0, -20, 20, -20, 0],
        },
        ease: "steps(6)",
        duration: 1,
        willChange: "transform, width",
        onComplete: () => {
          sessionStorage.setItem("hasAnimationPlayed", "true");
          hasAnimationPlayed.current = true;
          initScrollAnimations();
        },
      });
    } else {
      initScrollAnimations();
    }
  });

  return (
    <div
      className="fixed flex items-center justify-center z-10 aspect-auto w-3/4 lg:w-[30%] h-[65vh] sm:h-[70vh] sm:w-[60%] lg:h-[100vh]"
      id="heroPicture-container"
      ref={heroPictureRef}
    >
      <img
        src={images[0]} // Set initial image
        className="drop-shadow-custom object-cover"
        alt="Hero Animation"
      />
    </div>
  );
};
