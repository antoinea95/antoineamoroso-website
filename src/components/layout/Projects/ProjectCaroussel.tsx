import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../../hooks/useAppContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";
import { BsFillCircleFill } from "react-icons/bs";

export const ProjectCaroussel = ({ pictures }: { pictures: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isLargeScreen } = useAppContext();

  const carousel = useRef<HTMLElement>(null);
  const intervalRef = useRef<number | null>(null);

  const stopAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current); // Arrête l'intervalle si existant
  };

  const activeImgRef = useRef<HTMLImageElement>(null);
  const prevImgRef = useRef<HTMLImageElement>(null);
  const nextImgRef = useRef<HTMLImageElement>(null);
  const rotateFrame = [5, -5, 5, -5, 0];

  useEffect(() => {
    gsap.fromTo(carousel.current, {y: 200}, { keyframes: {rotate: [5, -5, 5, -5, 0]}, y: 0, duration: 0.6, ease: "steps(6)", delay: 0.3})
  }, [])

  const { contextSafe } = useGSAP(() => {
    gsap.set(nextImgRef.current, { x: isLargeScreen ? "-60vw" : "-90vw" });
    gsap.set(activeImgRef.current, { x: isLargeScreen ? "-60vw" : "-90vw" });
    gsap.set(prevImgRef.current, { x: isLargeScreen ? "-60vw" : "-90vw" });
  }, [activeIndex]);

  const next = contextSafe(() => {
    stopAutoScroll();
    const tl = gsap.timeline({
      onComplete: () =>
        setActiveIndex((prevIndex) =>
          prevIndex === pictures.length - 1 ? 0 : prevIndex + 1
        ),
    });

    tl.to(
      activeImgRef.current,
      {
        keyframes: {
          rotate: rotateFrame,
        },
        x: isLargeScreen ? "60vw" : "90vw",
        ease: "steps(4)",
        duration: 0.7,
      },
      "<"
    ).to(
      nextImgRef.current,
      {
        keyframes: {
          rotate: rotateFrame,
        },
        x: 0,
        ease: "steps(4)",
        zIndex: 10,
        duration: 0.7,
      },
      "<"
    );
  });

  const prev = contextSafe(() => {
    stopAutoScroll();

    const tl = gsap.timeline({
      onComplete: () =>
        setActiveIndex((prevIndex) =>
          prevIndex === 0 ? pictures.length - 1 : prevIndex - 1
        ),
    });

    tl.to(
      activeImgRef.current,
      {
        keyframes: {
          rotate: rotateFrame,
        },
        x: isLargeScreen ? "-120vw" : "-150vw",
        ease: "steps(4)",
        duration: 0.7,
      },
      "<"
    ).to(
      prevImgRef.current,
      {
        keyframes: {
          rotate: rotateFrame,
        },
        x: isLargeScreen ? "-120vw" : "-150vw",
        ease: "steps(4)",
        duration: 0.7,
      },
      "<"
    );
  });

  useEffect(() => {
    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        next();
      }, 3000);
    };

    startAutoScroll();

    return () => stopAutoScroll(); // Nettoie l'intervalle au démontage
  }, [next]);

  const getPrevIndex = () =>
    activeIndex - 1 < 0 ? pictures.length - 1 : activeIndex - 1;
  const getNextIndex = () =>
    activeIndex + 1 > pictures.length - 1 ? 0 : activeIndex + 1;

  return (
    <section
      className="overflow-hidden py-10 flex items-center justify-center relative w-fit mx-auto"
      ref={carousel}
    >
      <button
        className="absolute left-3 z-20 text-3xl text-primary"
        onClick={prev}
      >
        <PiArrowLeftBold
          className="drop-shadow-custom overflow-visible"
          stroke="#f1f5f9"
          paintOrder="stroke"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{
            strokeWidth: "clamp(2px, 4rem, 50px)",
          }}
        />
      </button>
      <button
        className="absolute right-3 z-20 text-3xl text-primary"
        onClick={next}
      >
        <PiArrowRightBold
          className="drop-shadow-custom overflow-visible"
          stroke="#f1f5f9"
          paintOrder="stroke"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{
            strokeWidth: "clamp(2px, 4rem, 50px)",
          }}
        />
      </button>
      <div className="w-[90vw] lg:w-[60vw] flex items-center">
        <img
          src={pictures[getNextIndex()]}
          className="object-cover w-full h-full px-10"
          ref={nextImgRef}
        />
        <img
          src={pictures[activeIndex]}
          className="object-cover w-full h-full px-10"
          ref={activeImgRef}
        />
        <img
          src={pictures[getPrevIndex()]}
          className="object-cover w-full h-full px-10"
          ref={prevImgRef}
        />
      </div>
      <div className="absolute bottom-3 flex items-center justify-between gap-3">
        {pictures.map((pic, index) => (
          <span
            className={`${
              activeIndex === index ? "text-xl" : "text-base"
            } text-primary`}
            key={index}
          >
            {activeIndex === index ? (
              <BsFillCircleFill
                className="drop-shadow-custom overflow-visible"
                stroke="#f1f5f9"
                paintOrder="stroke"
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{
                  strokeWidth: "clamp(2px, 1em, 5px)",
                }}
              />
            ) : (
              <BsFillCircleFill />
            )}
          </span>
        ))}
      </div>
    </section>
  );
};
