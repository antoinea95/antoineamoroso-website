import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ElementType, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from 'uuid'

gsap.registerPlugin(ScrollTrigger);

/**
 * `Title` is a component that renders a heading or paragraph with a stroke effect behind the text.
 * It allows customization of the text content, heading level.
 *
 * @param {Object} props - The properties for the Title component.
 * @param {string} props.titleText - The text content to be displayed in the title.
 * @param {ElementType} props.headingLevel - The HTML heading level or element type (e.g., 'h1', 'p') for the title.
 * @param {string} props.trigger - an Id to trigger the scroll
 *
 * @returns A styled heading or paragraph element with the specified text and stroke effect.
 */

export const Title = ({
  titleText,
  headingLevel: Heading,
  trigger,
}: {
  titleText: string;
  headingLevel: ElementType;
  trigger: string;
}) => {
  const { t, i18n } = useTranslation();
  const titleRef = useRef<HTMLDivElement>(null);
  const translateTitle = useMemo(() => t("sectionTitles." + titleText), [t, titleText]);


  useEffect(() => {
    const titleElements = titleRef.current?.querySelectorAll("span");

    if (titleElements) {
      gsap.set(titleElements, {
        x: () => gsap.utils.random(-500, 500), // Position X aléatoire
        y: () => gsap.utils.random(-100, 200), // Position Y aléatoire
        scale: () => gsap.utils.random(0.3, 2), // Position Y aléatoire
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "restart none none reset",
        },
      });

      tl.fromTo(
        titleElements,
        { scale: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          keyframes: {
            rotation: [-15, 15, -15, 15, -15, 10, 0],
          },
          duration: 0.6,
          stagger: 0.1,
          ease: "steps(5)",
        }
      );

      return () => {
        tl.kill();
        gsap.killTweensOf(titleElements);
      };
    }
  }, [trigger, translateTitle, i18n.language]);

  return (
    <Heading ref={titleRef} className="flex flex-nowrap">
      {translateTitle
        .split("")
        .map((letter) => {
          if (letter === " ") {
            return (
              <span className="inline-block px-2" key={`space_${uuid()}`}></span>
            );
          } else {
            return (
              <span key={`${letter}_${uuid()}`} className="inline-block">
                {letter}
              </span>
            );
          }
        })}
    </Heading>
  );
};
