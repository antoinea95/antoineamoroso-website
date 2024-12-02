import { IconType } from "react-icons";
import { useAppContext } from "../../hooks/useAppContext";

/**
 * `RoundLink` is a component that renders a rounded link with an icon and text that slides in on hover.
 *
 * @param {Object} props - The properties for the RoundLink component.
 * @param {string} props.url - The URL for the link.
 * @param {string} props.src - The source path for the icon image.
 * @param {string} props.content - The text content displayed within the link.
 *
 * @returns A rounded link with an image icon and sliding text effect on hover.
 */
export const IconLink = ({
  url,
  icon,
  content,
}: {
  url: string;
  icon: IconType;
  content: string;
}) => {
  const Icon = icon;

  const {isLargeScreen} = useAppContext();

  return (
    <a
      href={url}
      target="_blank"
      className="flex items-center -space-x-0.5 text-xl font-extrabold pt-2 pb-1 leading-4 group transition-all"
    >
      <Icon className="rounded-full bg-primary text-white flex items-center justify-center p-1 w-7 h-7  lg:w-8 lg:h-8 border-2 lg:shadow-custom mb-1 border-white z-[1]" />
      {isLargeScreen && <span className="inline-block py-1 text-primary w-0 overflow-hidden whitespace-nowrap group-hover:w-[95px] transition-all">
        {content}
      </span>}
    </a>
  );
};
