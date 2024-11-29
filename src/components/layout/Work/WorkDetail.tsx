import { Dispatch, SetStateAction } from "react";
import { iconMap } from "../../../utils/iconMap";
import { WorkCardProps } from "./WorkCard";
import { RiCloseLine } from "react-icons/ri";

export const WorkDetail = ({
  work,
  setWorkActive,
}: {
  work: WorkCardProps;
  setWorkActive: Dispatch<SetStateAction<number| null>>;
}) => {
  return (
    <div className="flex flex-col gap-10 overflow-hidden">
      <section className="flex flex-col lg:flex-row justify-between items-center gap-3">
        <div className="flex flex-col items-center lg:items-start">
          <h3>{work.company}</h3>
          <p className="text-sm">{work.role}</p>
        </div>
        <button
          onClick={() => setWorkActive(null)}
          className="w-5 h-5 rounded-full bg-primary text-secondary flex items-center justify-center"
        >
          <RiCloseLine />
        </button>
      </section>
      <section className="flex flex-col lg:flex-row justify-between p-2 gap-10">
        <div className="lg:w-[50%] space-y-3">
          <p className="font-bold border-b pb-1 mb-3 text-lg lg:text-xl">
            Summary
          </p>
          <p className="text-sm lg:text-lg font-semibold">{work.summary}</p>
          {work.technos && (
            <div>
              <p className="font-bold border-b pb-1 mb-3 text-lg lg:text-xl">
                Stack
              </p>
              <div className="flex items-center gap-5">
                {work.technos.map((techno) => {
                  const Icon = iconMap[techno.icon];
                  return (
                    <p
                      key={techno.icon}
                      className="text-xs flex flex-col items-center font-bold"
                    >
                      <Icon
                        size={30}
                        className="drop-shadow-custom overflow-visible z-10"
                        stroke="#f1f5f9"
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
        </div>
        {work.features && (
          <div className="text-xs lg:w-[50%]">
            <p className="font-bold border-b pb-1 mb-3 text-lg lg:text-xl">
              Main features
            </p>
            <ul className="space-y-5">
              {work.features.map((feature, index) => (
                <li key={index} className="flex flex-col text-xs">
                  <span className="font-bold text-sm">
                    {feature.split(":")[0]}
                  </span>
                  {feature.split(":")[1]}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};
