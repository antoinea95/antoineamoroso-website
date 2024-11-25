import { useAppContext } from "../../../hooks/useAppContext";
import { Techno } from "../../text/Techno";

export const WorkDetail = ({
  detail,
  technos,
}: {
  detail: string;
  technos?: { icon: string; name: string }[];
}) => {

  const {detailsRef} = useAppContext();

  return (
    <section
      className="flex flex-col gap-3 overflow-hidden"
      ref={detailsRef}
    >
      <p className="text-white text-xs lg:text-sm whitespace-normal font-semibold">
        {detail}
      </p>
      {technos && (
        <div className="flex items-center gap-3">
          {technos.map((techno) => (
            <Techno techno={techno} size="text-sm" key={techno.name} />
          ))}
        </div>
      )}
    </section>
  );
};
