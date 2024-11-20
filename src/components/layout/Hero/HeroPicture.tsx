import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../../hooks/useAppContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const HeroPicture = () => {
  const { isLargeScreen, navRef, scrollY} = useAppContext();
  const [currentImage, setCurrentImage] = useState(0);
  const images = ["./assets/big-head.png", "./assets/big-head-2.png"];

  const heroPictureRef = useRef<HTMLDivElement>(null);
  const isAnimated = sessionStorage.getItem("hasAnimationPlayed");

  const initScrollAnimations = () => {
    if (navRef && heroPictureRef) {
      const navElement = navRef?.current;
      const heroPictureElement = heroPictureRef?.current;

      if (navElement && heroPictureElement) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroPictureElement,
            start: "top top",
            end: "+=180",
            invalidateOnRefresh: true,
            scrub: 0.3,
          },
        });

        tl.to(heroPictureElement, {
          keyframes: {
            rotate: [0, -20, 20, -20, 0],
          },
          width: isLargeScreen ? "6%" : "20%",
          maxWidth: "80px",
          left: "50%",
          height: "10%",
          zIndex: 20,
          minHeight: 0,
          marginTop: 0,
          marginBottom: "auto",
          duration: 1,
          ease: "steps(5)",
        })
          .to(navElement, {
            keyframes: {
              gap: ["8rem", "3rem", `80px`],
              rotate: [-5, 5, 0],
            },
            duration: 1,
            ease: "steps(3)",
          });
      }

      if (scrollY > 0 || isAnimated === "true") {
        ScrollTrigger.update();
      }
    }
  };

  useGSAP(() => {
    ScrollTrigger.refresh();
    const heroSectionTop = heroPictureRef.current?.offsetTop;
    const isAnimated = sessionStorage.getItem("hasAnimationPlayed")

    gsap.set(heroPictureRef.current, {
      width: isLargeScreen ? "30%" : "70%",
      xPercent: -50,
      left: "48%",
    });

    if (heroSectionTop) {
      if (isAnimated !== "true") {
        gsap.to(heroPictureRef.current, {
          keyframes: {
            width: isLargeScreen ? ["1%", "7.5%", "15%", "22.5%", "35%", "30%"] : ["1%", "20%", "35%", "50%", "75%", "70%"]  ,
            rotate: [0, -20, 20, -20, 0, 0],
          },
          ease: "steps(6)",
          duration: 1,
          onComplete: () => {
            sessionStorage.setItem("hasAnimationPlayed", "true")
            initScrollAnimations()
          },
        });
      }

      initScrollAnimations()
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length); // Changer d'image
    }, 900); // Change d'image toutes les 2 secondes

    // Nettoyage de l'intervalle sur démontage
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="fixed lg:h-screen h-[70vh] min-h-[550px] max-w-[300px] sm:max-w-[400px] lg:max-w-[550px] lg:min-h-0 max-h-dvh flex items-center justify-center z-10"
      id="heroPicture-container"
      ref={heroPictureRef}
    >
      <img
        src={images[currentImage]}
        className="drop-shadow-custom w-full aspect-auto"
      />
    </div>
  );
};
