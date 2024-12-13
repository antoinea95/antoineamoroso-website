import { PropsWithChildren, useEffect, useRef } from "react";
import { iconMap } from "../../../utils/iconMap";
import gsap from "gsap";
import { useTranslation } from "react-i18next";


/**
 * 
 * @param {string} title - title of projects/works sections
 * @returns an animate subtitle
 */
const ContentTitle = ({ title }: { title: string }) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const {t} = useTranslation();

  // Enter animation
  useEffect(() => {
    const animation = gsap.fromTo(
      spanRef.current,
      { y: 100 },
      {
        keyframes: {
          rotate: [5, -5, 5, -5, 5, 0],
        },
        y: 0,
        ease: "steps(6)",
        duration: 1,
        delay: 0.5,
      }
    );

    return () => {
      animation.kill();
    }
  }, []);

  return (
    <p className="font-bold border-b border-primary pb-1 mb-3 text-lg lg:text-xl overflow-hidden whitespace-nowrap">
      <span ref={spanRef} id="title" className="inline-block">
        {t("sectionTitles." + title)}
      </span>
    </p>
  );
};

/**
 * 
 * @param {string} direction - left or right, indicate the animation direction
 * @returns a container for the projects/works section (summary, stack and features)
 */
export const ContentContainer = ({
  direction,
  children,
}: PropsWithChildren<{ direction: string }>) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Enter animation
  useEffect(() => {
    const animation = gsap.fromTo(
      sectionRef.current,
      { x: direction === "right" ? "-100vw" : "100vw" },
      {
        keyframes: {
          rotate: [5, -5, 5, -5, 5, 0],
        },
        x: 0,
        duration: 1,
        ease: "steps(6)",
      }
    );

    return () => {
      animation.kill();
    }
  }, [direction]);

  return (
    <section ref={sectionRef} className="flex-1 space-y-3">
      {children}
    </section>
  );
};


/**
 * 
 * @param {string} props.id - An id to access translation object
 * @param {{ icon: string; name: string }[]} props.stack - an optionnal array to display the stack with an icon and a name
 * @param {string[]} props.features - an optionnal array to display a features list
 * @returns a section to display the project/work content in  3 sections (summary, stack, features )
 */
export const ProjectContent = ({
  id,
  stack,
  features,
}: {
  id: string,
  stack?: { icon: string; name: string }[];
  features?: string[];
}) => {

  const {t} = useTranslation();
  const isWork = id.includes("work");

  const translateSummary = isWork ? t("works." + id + ".summary") : t("projects." + id + ".summary");


  return (
    <section className="flex flex-col lg:flex-row lg:justify-between p-2 gap-10 lg:flex-1 mt-10">
      <ContentContainer direction="right">
        <ContentTitle title="About" />
        <p className="text-sm lg:text-lg font-semibold">{translateSummary}</p>
        {stack && (
          <div>
            <ContentTitle title="Stack" />
            <div className="flex items-center gap-5">
              {stack.map((techno) => {
                const Icon = iconMap[techno.icon];
                return (
                  <p
                    key={techno.icon}
                    className="text-xs flex flex-col items-center font-bold"
                  >
                    <Icon
                      size={30}
                      className="drop-shadow-custom overflow-visible z-10 stroke-tertiary"
                      paintOrder="stroke"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      style={{
                        strokeWidth: "clamp(2px, 0.3em, 5px)",
                      }}
                    />
                    {techno.name}
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </ContentContainer>
      {features && (
        <ContentContainer direction="left">
          <ContentTitle title="Main features" />
          <ul className="space-y-5 text-primary">
            {features.map((__, index) => {
                const translatedFeature = isWork ? t("works." + id + ".features." + index ) : t("projects." + id + ".features." + index);
              return <li key={index} className="flex flex-col text-xs">
                <span className="font-bold text-sm">
                  {translatedFeature.split(":")[0]}
                </span>
                {translatedFeature.split(":")[1]}
              </li>
        })}
          </ul>
        </ContentContainer>
      )}
    </section>
  );
};
