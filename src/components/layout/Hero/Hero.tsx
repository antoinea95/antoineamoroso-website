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

    const getTitleAnimation = (isToLeft = false) => {
      const rotateFrames = [5, -5, 5, 0, 0];
      const xValues = [280, 187, 94, -10, 0];
      const keyframes = isLargeScreen
        ? {
            x: isToLeft ? xValues : xValues.map(val => -val),
            rotate: rotateFrames,
          }
        : { y: [-80, -60, -40, -20, 0], rotate: rotateFrames };
  
      return { keyframes, duration: 0.6, ease: "steps(4)" };
    };

    const navElement = navRef?.current;
    if (navElement && titleRef.current && subTitleRef.current) {
      const isAnimated = sessionStorage.getItem("hasAnimationPlayed");

      if (isAnimated !== "true") {
        const tl = gsap.timeline({ delay: 1.2 });
        const [titleLeft, titleRight] = titleRef.current.childNodes;

        // Set initial positions for the titles and subtitle
        gsap.set(titleRef.current, {
          y: isLargeScreen ? -30 : -80,
          visibility: "hidden",
        });
        gsap.set(subTitleRef.current, { y: -80, opacity: 0, zIndex: -1 });
        gsap.set(navElement, { y: -80 });

        // Main animation sequence
        tl.to(titleRef.current, { visibility: "visible", duration: 0.2, ease: "none" });

        if (isLargeScreen) {
          tl.to(titleLeft, getTitleAnimation(true), "<")
            .to(titleRight, getTitleAnimation(false), "<");
        } else {
          tl.to(titleRef.current, getTitleAnimation(), "<");
        }

        tl.to(titleRef.current, { y: 0, duration: 0.3, ease: "steps(2)" }, ">")
          .to(subTitleRef.current, { opacity: 1, duration: 0 }, "<+0.2")
          .to(
            subTitleRef.current,
            {
              keyframes: { "95%": { y: 20 }, "100%": { y: 0, zIndex: 1 } },
              duration: 0.5,
              ease: "steps(4)",
            },
            "<-0.2"
          );

        tl.to(
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
      }
    }
  }, [isLargeScreen, navRef]);

  return (
    <section className="max-h-dvh h-[70vh] py-5 w-[95%] m-auto">
      <NavBar />
      <HeroPicture />
      <section
        id="hero"
        className="flex flex-col items-center justify-end lg:justify-center lg:h-full h-[83vh] min-h-[575px] lg:space-y-3 2xl:space-y-6 mt-3 w-fit lg:w-full mx-auto"
      >
        <h1
          className="flex items-center justify-center lg:w-full flex-wrap lg:flex-nowrap -space-y-3 sm:space-y-0"
          ref={titleRef}
          style={{ gap: isLargeScreen ? "24%" : "10px" }}
        >
          <span className="will-change-auto">Antoine</span>
          <span className="will-change-auto">Amoroso</span>
        </h1>
        <section
          className="flex flex-col-reverse lg:flex-row justify-between items-center flex-nowrap w-full lg:w-[97%]"
          ref={subTitleRef}
        >
          <div className="flex items-center w-fit lg:gap-2">
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
            className="font-extrabold relative tracking-tight text-primary text-xl"
            style={{
              fontSize: "clamp(1.5rem, 5vw, 2rem)",
            }}
          >
            Front-end developer
          </p>
        </section>
      </section>
    </section>
  );
};
