import { IconType } from "react-icons";

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
      target="_blank"
      className="flex items-center gap-1 bg-primary text-tertiary h-fit py-1 px-3 rounded-full border-2 border-tertiary hover:shadow-custom hover:scale-110 transition-transform"
    >
      <Icon />
      {content}
    </a>
  );
};
