import { IconType } from "react-icons";
import { Stroke } from "../text/Stroke";

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
  return (
    <a
      href={url}
      target="_blanl"
      className="inline-flex w-6 sm:w-8 lg:w-10 2xl:w-14 py-1 items-center -space-x-[10px] text-primary font-semibold group lg:hover:w-32 2xl:hover:w-36 overflow-hidden transition-all"
    >
      <span className="flex items-center shrink-0 z-[1] h-fit w-6 sm:w-8 lg:w-fit text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl">
        <Icon
          className="drop-shadow-custom overflow-visible"
          stroke="#f1f5f9"
          paintOrder="stroke"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{
            strokeWidth: "clamp(2px, 0.2em, 5px)",
          }}
        />
      </span>

      <span className="relative px-3 inline-flex lg:-translate-x-14 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 transition-all duration-200 whitespace-nowrap"
      style={{
        fontSize: "clamp(14px, 8vw, 24px)"
      }}
      >
        {content}
        <Stroke name={content} />
      </span>
    </a>
  );
};
