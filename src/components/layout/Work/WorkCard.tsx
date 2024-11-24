import { Stroke } from "../../text/Stroke";
import { useAppContext } from "../../../hooks/useAppContext";
import { Dispatch, SetStateAction } from "react";
import { WorkDetail } from "./WorkDetail";

type WorkCardProps = {
  id: string;
  date: string;
  role: string;
  technos?: {name: string, icon:string}[]
  company: string;
  details: string;
};

export const WorkCard = ({
  work,
  workActive,
  setWorkActive,
}: {
  work: WorkCardProps;
  workActive: string | null
  setWorkActive: Dispatch<SetStateAction<string | null>>;
}) => {
  const { isLargeScreen } = useAppContext();

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
          onMouseEnter={() => setWorkActive(work.id)}
          onMouseLeave={() => setWorkActive(null)}
        />
      ) : (
        <button
          onClick={() => setWorkActive(prev => prev === work.id ? null : work.id)}
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
      {workActive === work.id && <WorkDetail detail={work.details} technos={work.technos} />}
    </div>
  );
};
