import { useRef } from "react";
import { Section } from "../../container/Section";
import { Title } from "../../text/Title";
import { useAppContext } from "../../../hooks/useAppContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { IconLink } from "../../cta/IconLink";
import { RiLinkedinFill } from "react-icons/ri";
import { TbBrandGithubFilled } from "react-icons/tb";
import { NavBar } from "../../nav/NavBar";
import { HeroPicture } from "./HeroPicture";
gsap.registerPlugin(ScrollTrigger);

/**
 * Hero component that includes animations for the hero section, titles, and subtitle.
 * @returns The Hero component.
 */
export const Hero = () => {
  const {
    navRef,
    isLargeScreen,
  } = useAppContext();
  const titleRef = useRef<HTMLElement>(null);
  const subTitleRef = useRef<HTMLElement>(null);

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

  
  useGSAP(() => {
    const navElement = navRef?.current;
    if (navElement && titleRef.current && subTitleRef.current) {
      const isAnimated = sessionStorage.getItem("hasAnimationPlayed")

        if(isAnimated !== "true") {
          const tl = gsap.timeline({
            delay: 1.2
          });        
          const [titleLeft, titleRight] = titleRef.current.childNodes
  
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
            { width: isLargeScreen ? "100%" : "fit-content", duration: 0, ease: "none" },
            ">-0.3"
          );
  
          if (isLargeScreen) {
            tl.to(
              titleLeft,
              getTitleAnimation(true),
              "<"
            ).to(titleRight, getTitleAnimation(false), "<");
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


  return (
    <Section>
        <NavBar />
        <HeroPicture />
      <section
        id="hero"
        className="justify-end lg:justify-center lg:h-full w-fit lg:w-full flex flex-col items-center mx-auto 2xl:-space-y-4 h-[75vh] min-h-[575px]"
      >
        <section
          className="flex items-center justify-center overflow-hidden w-full"
          ref={titleRef}
          style={{gap: isLargeScreen ? "22%" : "0"}}
        >
          <Title headingLevel="h1" content="ANTOINE" />
          <Title headingLevel="h1" content="AMOROSO" />
        </section>
        <section
          className="flex justify-between items-center flex-nowrap w-full lg:w-[95%]"
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
