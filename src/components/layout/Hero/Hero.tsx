import { useEffect, useRef } from "react";
import { Section } from "../../container/Section";
import { Title } from "../../text/Title";
import { useAppContext } from "../../../hooks/useAppContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HeroPicture } from "./HeroPicture";
import { ScrollTrigger } from "gsap/all";
import { NavBar } from "../../nav/NavBar";
import { IconLink } from "../../cta/IconLink";
import { RiLinkedinFill } from "react-icons/ri";
import { TbBrandGithubFilled } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero component that includes animations for the hero section, titles, and subtitle.
 * @returns The Hero component.
 */
export const Hero = () => {
  const {
    navRef,
    heroPictureRef,
    heroPictureDimension,
    setHeroPictureDimension,
    isLargeScreen
  } = useAppContext();
  const titleRef = useRef<HTMLElement>(null);
  const subTitleRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (navRef && heroPictureRef && titleRef.current && subTitleRef.current) {
      const heroPictureElement = heroPictureRef.current;
      const navElement = navRef.current;

      const scrollY = window.scrollY;
      const heroSectionTop = heroPictureElement?.offsetTop || 0;

      if (scrollY > heroSectionTop) {
        initScrollAnimations();
      } else {
        const tl = gsap.timeline();

        // Entry animation for the hero picture
        tl.to(heroPictureElement, {
          keyframes: {
            scale: [0, 0.3, 0.6, 0.9, 1.1, 1],
            rotate: [0, -20, 20, -20, 0, 0],
          },
          duration: 1,
          ease: "steps(6)",
          onComplete: initScrollAnimations, // Directly calling the function
        });

        // Title intro animation configuration based on screen size
        const getTitleAnimation = (isToLeft = false) => {
          const isMobile = !isLargeScreen;
          const rotateFrames = [5, -5, 5, 0, 0];
          const xValues = [280, 187, 94, -10, 0];
          const keyframes = isMobile
            ? { y: [-80, -60, -40, -20, 0], rotate: rotateFrames }
            : {
                x: isToLeft
                  ? xValues
                  : xValues.map((value) =>
                      value.toLocaleString().includes("-")
                        ? `${value}`
                        : `-${value}`
                    ),
                rotate: rotateFrames,
              };

          return {
            keyframes,
            duration: 0.6,
            ease: "steps(4)",
          };
        };

        const [titleLeft, titleRight] = titleRef.current.childNodes;
        // Set initial positions for the titles and subtitle
        if (isLargeScreen) {
          gsap.set(titleLeft, { x: 280, y: -30 });
          gsap.set(titleRight, { x: -280, y: -30 });
        } else {
          gsap.set(titleRef.current, { y: -80 });
        }
        gsap.set(subTitleRef.current, { y: -80, opacity: 0, zIndex: -1 });
        gsap.set(navElement, { y: -80 });
        gsap.set(titleRef.current, { width: 0 });

        // Main animation sequence
        tl.to(
          titleRef.current,
          { width: "100%", duration: 0, ease: "none" },
          ">-0.3"
        );

        if (isLargeScreen) {
          tl.to(titleLeft, getTitleAnimation(true), "<").to(
            titleRight,
            getTitleAnimation(false),
            "<"
          );
        } else {
          tl.to(titleRef.current, getTitleAnimation(), "<");
        }

        // Animate titles and subtitle
        tl.to(
          titleRef.current.childNodes,
          { y: 0, duration: 0.3, ease: "steps(2)" },
          ">"
        )
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
  }, [isLargeScreen]);

  /**
   * Initializes scroll-triggered animations using GSAP and ScrollTrigger.
   */
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

        // Animation for scaling down the hero picture
        tl.to(heroPictureElement, {
          keyframes: {
            scale: [1, 0.8, 0.6, 0.4, 0.2],
            rotate: [0, -20, 20, -20, 0],
          },
          top: 0,
          left: "50%",
          yPercent: isLargeScreen ? -40 : -40,
          duration: 1,
          ease: "steps(5)",
        });

        // Animation for adjusting the gap in the navigation element
        tl.to(navElement, {
          keyframes: {
            gap: ["8rem", "3rem", `${heroPictureElement.offsetWidth * 0.2}px`],
            rotate: [-5, 5, 0],
          },
          duration: 1,
          ease: "steps(3)",
        });
      }
    }
  };

  // Update screen size and hero picture dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      if (heroPictureRef && heroPictureRef.current) {
        setHeroPictureDimension({
          width: heroPictureRef.current.offsetWidth,
          height: heroPictureRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [heroPictureRef, heroPictureDimension, setHeroPictureDimension]);

  return (
    <Section>
      <NavBar />
      <HeroPicture />
      <section
        className=" justify-center h-full w-fit flex flex-col items-center mx-auto 2xl:-space-y-4"
        style={{
          paddingTop: isLargeScreen
            ? "0"
            : `calc(${heroPictureDimension.height + 100}px)`,
        }}
      >
        <section
          className="flex items-center justify-center overflow-hidden"
          style={{
            gap: isLargeScreen
              ? `calc(${heroPictureDimension.width - 20}px - 7vw)`
              : "0",
          }}
          ref={titleRef}
        >
          <Title headingLevel="h1" content="ANTOINE" />
          <Title headingLevel="h1" content="AMOROSO" />
        </section>
        <section
          className="flex w-[95%] justify-between items-center flex-nowrap"
          ref={subTitleRef}
        >
          <div className="flex items-center w-fit">
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
          <Title headingLevel="h3" content="front-end developer" />
        </section>
      </section>
    </Section>
  );
};
