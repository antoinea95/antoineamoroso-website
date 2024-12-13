import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import gsap from "gsap";
import { useAppContext } from "../../../hooks/useAppContext";
import { useTranslation } from "react-i18next";

export type WorkCardProps = {
  id: string;
  date: string;
  role: string;
  technos?: { name: string; icon: string }[];
  company: string;
  summary: string;
  features?: string[];
};

/**
 * Display a summary of the work on the timeline
 * @param {WorkCardProps} props.work - Contain every information of the work
 * @param {number} props.index - Index to handle the modal display
 */
export const WorkCard = ({
  work,
  index,
  setWorkActive,
}: {
  work: WorkCardProps;
  index: number;
  setWorkActive: Dispatch<SetStateAction<number | null>>;
}) => {

  const workRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const { isLargeScreen } = useAppContext();
  const {t} = useTranslation();


  // Animation entry
  useEffect(() => {
    const workElements = workRef.current?.childNodes;
    const dateElements = dateRef.current?.childNodes;
    const buttonElements = buttonRef.current?.childNodes;

    if (!workElements || !dateElements || !buttonElements) return;

    const animationDuration = 0.6;
    const animationEase = "steps(5)";
    const offsetY = 50;
    const offsetX = 150;

    const getInitialPosition = (direction: "top" | "bottom") =>
      direction === "top"
        ? isLargeScreen
          ? { y: offsetY }
          : { x: offsetX }
        : isLargeScreen
        ? { y: -offsetY }
        : { x: -offsetX };

    const finalPosition = isLargeScreen ? { y: 0 } : { x: 0 };

    const timeLine = gsap.timeline({
      scrollTrigger: {
        trigger: "#work",
        start: "top 30%",
        end: "top 20%",
        toggleActions: "play none none reset",
      },
    });

    timeLine
      .fromTo(
        buttonElements,
        { scale: 0 },
        {
          scale: 1,
          ease: "steps(3)",
          duration: 0.3,
          delay: 0.3 * (index + 1),
        }
      )
      .fromTo(
        workElements,
        getInitialPosition("bottom"),
        {
          ...finalPosition,
          keyframes: {
            rotate: [-5, 5, -5, 5, 0],
          },
          ease: animationEase,
          duration: animationDuration,
        },
        "<"
      )
      .fromTo(
        dateElements,
        getInitialPosition("top"),
        {
          ...finalPosition,
          keyframes: {
            rotate: [-5, 5, -5, 5, 0],
          },
          ease: animationEase,
          duration: animationDuration,
        },
        "<"
      );

      return () => {
        timeLine.kill()
      }
  }, [isLargeScreen, index]);

  return (
    <div>
      <div
        className="flex items-center lg:whitespace-nowrap lg:flex-col lg:w-fit lg:gap-2 hover:scale-110 cursor-pointer"
        onClick={() => {
          setWorkActive(index);
        }}
      >
        <section
          className="flex-1 flex items-center justify-center px-2 lg:mt-1 overflow-hidden"
          ref={dateRef}
        >
          <p className="relative text-sm font-normal py-2">
            {t("works."+ work.id + ".date")}
          </p>
        </section>
        <section ref={buttonRef}>
          <div className="w-7 h-7 rounded-full bg-primary border-4 border-tertiary shadow-custom" />
        </section>
        <section
          className="flex flex-col lg:items-center lg:-space-y-3 flex-1 px-2 overflow-hidden"
          ref={workRef}
        >
          <p className="relative text-base lg:text-base leading-none lg:p-0.5 font-bold uppercase">
            {t("works."+ work.id + ".role")}
          </p>
          <p className="relative text-xs lg:text-sm font-medium p-0.5">
            {work.company}
          </p>
        </section>
      </div>
    </div>
  );
};
