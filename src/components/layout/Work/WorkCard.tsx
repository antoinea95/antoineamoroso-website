import { Stroke } from "../../text/Stroke";
import { useAppContext } from "../../../hooks/useAppContext";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { WorkDetail } from "./WorkDetail";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export type WorkCardProps = {
  id: string;
  date: string;
  role: string;
  technos?: { name: string; icon: string }[];
  company: string;
  details: string;
};

export const WorkCard = ({
  work,
  setWorkActive,
  workActive,
}: {
  work: WorkCardProps;
  workActive: string | null;
  setWorkActive: Dispatch<SetStateAction<string | null>>;
}) => {
  const { isLargeScreen } = useAppContext();
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const [detailsHeight, setDetailsHeight] = useState(0);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);


  useEffect(() => {
    if(detailsRef.current) {
      setDetailsHeight(detailsRef.current.offsetHeight)
    }
  }, [detailsRef])


  const { contextSafe } = useGSAP(() => {
    if (detailsRef.current) {
      gsap.set(detailsRef.current, {opacity: 0, pointerEvents: "none"});
      xTo.current = gsap.quickTo(detailsRef.current, "x", { duration: 0.2 });
      yTo.current = gsap.quickTo(detailsRef.current, "y", { duration: 0.2 });
    }
  });

  const handleDetailPosition = contextSafe(
    (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
      if (workActive === work.id) {
        setWorkActive(null);
        gsap.to(detailsRef.current, {
          opacity: 1,
        });
        return;
      }

      if (xTo.current && yTo.current) {
        const needToBeTop = window.innerHeight - event.clientY <= 200;
        xTo.current(event.clientX - (isLargeScreen ? 200 : 180));
        yTo.current(needToBeTop ? event.clientY - (detailsHeight + 30) : event.clientY + 30);
        gsap.to(detailsRef.current, {
          opacity: 1,
        });
      }

      // Active la carte actuelle
      setWorkActive(work.id);
    }
  );

  const handleMouseLeave = contextSafe(() => {
    setWorkActive(null);
    if(xTo.current && yTo.current) {
      xTo.current(0);
      yTo.current(0)
    }
    gsap.to(detailsRef.current, {
      opacity: 0,
    });
  });

  return (
    <div className="flex items-center whitespace-nowrap lg:flex-col lg:w-fit lg:gap-2 w-full">
      <section className="flex-1 flex items-center justify-center overflow-hidden px-2 lg:mt-1">
        <p className="relative text-primary text-base font-medium py-2">
          {work.date}
          <Stroke name={work.date} />
        </p>
      </section>
      {isLargeScreen ? (
        <div
          className="w-5 h-5 rounded-full bg-primary border-[3px] border-white shadow-custom hover:scale-150 transition-all cursor-pointer"
          onMouseEnter={handleDetailPosition}
          onMouseLeave={handleMouseLeave}
        />
      ) : (
        <button
          onClick={handleDetailPosition}
          className="w-5 h-5 rounded-full bg-primary border-[3px] border-white shadow-custom hover:scale-150 transition-all cursor-pointer"
        ></button>
      )}
      <section className="flex flex-col items-center -space-y-3 flex-1 overflow-hidden px-2">
        <p className="relative text-primary text-base lg:text-lg font-semibold p-0.5">
          {work.role}
          <Stroke name={work.role} />
        </p>
        <p className="relative text-primary text-sm lg:text-base font-medium p-0.5">
          {work.company}
          <Stroke name={work.company} />
        </p>
      </section>
      <div
        ref={detailsRef}
        className="fixed bg-primary border-[3px] border-white shadow-custom rounded-2xl max-w-[350px] lg:max-w-[400px] px-4 py-3 z-20 top-0 left-0 overflow-hidden"
        style={{visibility: workActive === work.id ? "visible" : "hidden"}}
      >
          <WorkDetail detail={work.details} technos={work.technos} />
      </div>
    </div>
  );
};
