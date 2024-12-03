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
      className="flex items-center justify-between gap-0 text-xl font-extrabold group lg:hover:gap-2 lg:hover:pr-3 transition-all w-fit h-9 p-2 rounded-full bg-primary text-tertiary"
    >
      <Icon className=" flex items-center justify-center w-5 h-5  z-[1]" />
      {isLargeScreen && <span className="inline-block text-tertiary max-w-0 overflow-hidden whitespace-nowrap lg:group-hover:w-fit lg:group-hover:max-w-[95px] transition-all text-lg font-light">
        {content}
      </span>}
    </a>
  );
};
