import { useEffect, useState } from "react";
import { useAppContext } from "../../../hooks/useAppContext";
import { WorkCard, WorkCardProps } from "./WorkCard";

export const WorkTimeline = ({ items }: { items: WorkCardProps[] }) => {

    const [workActive, setWorkActive] = useState<string | null>(null);
    const { isLargeScreen } = useAppContext();



  const handleScroll = () => {
    setWorkActive(null);
  };

  useEffect(() => {
    if (!isLargeScreen) {
      // Ajout des écouteurs pour mobile
      window.addEventListener("scroll", handleScroll);

      return () => {
        // Nettoyage des écouteurs
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isLargeScreen]);


    return (
        <div className="flex flex-col lg:flex-row lg:items-center justify-center lg:justify-between relative w-full lg:w-fit gap-6">
          <div className="h-full lg:h-3 w-3 lg:w-full border-[3px] absolute left-1/2 -translate-x-1/2 lg:left-0 lg:-translate-x-0 lg:top-1/2 lg:-translate-y-1/2 bg-primary border-white rounded-full -z-10 shadow-custom" />
          {items.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              setWorkActive={setWorkActive}
              workActive={workActive}
            />
          ))}
        </div>
    )
};
