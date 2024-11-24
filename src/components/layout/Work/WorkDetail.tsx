import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useAppContext } from "../../../hooks/useAppContext";
import { Techno } from "../../text/Techno";

export const WorkDetail = ({
  detail,
  technos,
}: {
  detail: string;
  technos?: { icon: string; name: string }[];
}) => {
  const detailsRef = useRef<HTMLDivElement>(null);
  const { isLargeScreen } = useAppContext();
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    // Initial setup
    gsap.set(detailsRef.current, {width: 0, maxHeight: 0, opacity: 0});
    // gsap.set(technosRef.current, {scale: 0})
    xTo.current = gsap.quickTo(detailsRef.current, "x", { duration: 0.2 });
    yTo.current = gsap.quickTo(detailsRef.current, "y", { duration: 0.2 });

  });

  useEffect(() => {
    const handleDetailPosition = (event: MouseEvent) => {
      if (xTo.current && yTo.current) {
        const isNeedToBeTop = window.innerHeight - event.clientY <= 250
        xTo.current(event.clientX - (isLargeScreen ? 200 : 180));
        yTo.current(
           isNeedToBeTop ? event.clientY - 200 : event.clientY + 30
        );
        gsap.to(detailsRef.current, { width: "100%", maxHeight: 300, opacity: 1, ease: "steps(5)"});
      }
    };

    if(isLargeScreen) {
        window.addEventListener("mousemove", handleDetailPosition);

        return () => {
          window.removeEventListener("mousemove", handleDetailPosition);
        };
    } else { window.addEventListener("click", handleDetailPosition);

        return () => {
          window.removeEventListener("click", handleDetailPosition);
        };}

     
  }, [isLargeScreen]);

  return (
    <section
      className="fixed bg-primary border-[3px] border-white shadow-custom rounded-2xl max-w-[350px] lg:max-w-[400px] w-fit px-4 py-3 z-20 top-0 left-0 flex flex-col gap-3 overflow-hidden"
      ref={detailsRef}
    >
      <p className="text-white text-xs lg:text-sm whitespace-normal font-semibold">
        {detail}

      </p>
      {technos && (
        <div className="flex items-center gap-3">
          {technos.map((techno) => (
            <Techno techno={techno} size="text-sm" />
          ))}
        </div>
      )}
    </section>
  );
};
