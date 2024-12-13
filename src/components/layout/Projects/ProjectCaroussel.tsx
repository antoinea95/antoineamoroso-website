import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";
import { BsFillCircleFill } from "react-icons/bs";


/**
 * Display a carousel with an indicator
 * @param {string[]} pictures - An array of pictures src
 */
export const ProjectCaroussel = ({ pictures }: { pictures: string[] }) => {

  // Handle state of the display picture
  const [activeIndex, setActiveIndex] = useState(0);

  // GSAP Ref
  const carousel = useRef<HTMLElement>(null);
  const intervalRef = useRef<number | null>(null);

    // Calculate the width of the carousel
    const calculateDynamicShift = () => {
      const carouselWidth = carousel.current?.offsetWidth || window.innerWidth * 0.7;
      return carouselWidth;
    };

  const stopAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // GSAP Ref
  const activeImgRef = useRef<HTMLImageElement>(null);
  const prevImgRef = useRef<HTMLImageElement>(null);
  const nextImgRef = useRef<HTMLImageElement>(null);
  const rotateFrame = [5, -5, 5, -5, 0];

  useEffect(() => {

    // Enter animation
    const animation = gsap.fromTo(
      carousel.current,
      { y: 200 },
      {
        keyframes: { rotate: [5, -5, 5, -5, 0] },
        y: 0,
        duration: 0.6,
        ease: "steps(6)",
        delay: 0.3,
      }
    );

    return () => {
      animation.kill();
    };
  }, []);

  // Set the start position
  const { contextSafe } = useGSAP(() => {
    gsap.set(nextImgRef.current, { x: -calculateDynamicShift() });
    gsap.set(activeImgRef.current, { x: -calculateDynamicShift() });
    gsap.set(prevImgRef.current, { x: calculateDynamicShift() });
  }, [activeIndex]);

  // Go to next picture with a GSAP Animation
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
        x: calculateDynamicShift(),
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

    // Go to prev picture with a GSAP Animation
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
        x: -calculateDynamicShift() * 2,
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
        x: -calculateDynamicShift() * 2,
        ease: "steps(4)",
        duration: 0.7,
      },
      "<"
    );
  });

  // Next picture every 3s
  useEffect(() => {
    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        next();
      }, 3000);
    };

    startAutoScroll();

    return () => stopAutoScroll();
  }, [next]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          prev();
          break;
        case "ArrowRight":
          next();
          break;
        case "Escape":
          stopAutoScroll();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);


  // Calculate prev and next index for GSAP animation
  const getPrevIndex = () =>
    activeIndex - 1 < 0 ? pictures.length - 1 : activeIndex - 1;
  const getNextIndex = () =>
    activeIndex + 1 > pictures.length - 1 ? 0 : activeIndex + 1;

  return (
    <section
      className="overflow-hidden py-10 flex items-center justify-center relative w-fit mx-auto"
      ref={carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label="Project carousel"
      aria-live="polite"
    >
      <button
        className="absolute left-2 lg:left-3 z-20 text-xl sm:text-3xl text-primary hover:scale-125 cursor-pointer"
        aria-label="Previous picture"
        onClick={prev}
      >
        <PiArrowLeftBold
          className="drop-shadow-custom overflow-visible stroke-tertiary"
          paintOrder="stroke"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{
            strokeWidth: "clamp(2px, 4rem, 50px)",
          }}
        />
      </button>
      <button
        className="absolute right-2 lg:right-3 z-20 text-xl sm:text-3xl text-primary hover:scale-125 cursor-pointer"
        aria-label="Next picture"
        onClick={next}
      >
        <PiArrowRightBold
          className="drop-shadow-custom overflow-visible stroke-tertiary"
          paintOrder="stroke"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{
            strokeWidth: "clamp(2px, 4rem, 50px)",
          }}
        />
      </button>
      <div className="w-[99vw] lg:w-[65vw] max-w-[1200px] flex items-center pb-2">
        <img
          src={pictures[getNextIndex()]}
          className="object-cover w-full h-full px-10 stroke-two"
          aria-hidden="true"
          ref={nextImgRef}
        />
        <img
          src={pictures[activeIndex]}
          className="object-cover w-full h-full px-10 stroke-two"
          alt={`Current picture ${activeIndex + 1} of ${pictures.length}`}
          ref={activeImgRef}
        />
        <img
          src={pictures[getPrevIndex()]}
          className="object-cover w-full h-full px-10 stroke-two"
          aria-hidden="true"
          ref={prevImgRef}
        />
      </div>
      <div className="absolute bottom-3 flex items-center justify-between gap-3">
      {pictures.map((_, index) => (
          <button
            key={index}
            className={`${
              activeIndex === index ? "text-xl" : "text-base"
            } text-primary`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          >
            <BsFillCircleFill
            className={`${ activeIndex === index ? "drop-shadow-custom overflow-visible stroke-tertiary" : "overflow-visible stroke-none"}`}
            paintOrder="stroke"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{
              strokeWidth: "clamp(2px, 1em, 5px)",
            }}
            
            />
          </button>
        ))}
      </div>
    </section>
  );
};
