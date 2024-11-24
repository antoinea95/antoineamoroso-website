import { iconMap } from "../../utils/iconMap";
import { IconType } from "react-icons";
import { Stroke } from "./Stroke";

export const Techno = ({
  techno,
  size,
}: {
  techno: { icon: string; name: string };
  size: string
}) => {
const iconName = techno.icon
  const Icon : IconType = iconMap[iconName];


  return (
    <p className={`flex flex-col items-center -space-y-2 text-primary font-semibold ${size}`}>
      <Icon 
          className="drop-shadow-custom overflow-visible z-10"
          stroke="#f1f5f9"
          paintOrder="stroke"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{
            strokeWidth: "clamp(2px, 0.3em, 10px)",
          }}
      />
      <span className="relative inline-flex">
        {techno.name}
        <Stroke name={techno.name} key={techno.name} />
    </span>
    </p>
  );
};
