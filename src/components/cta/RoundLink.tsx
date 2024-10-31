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
export const RoundLink = ({
    url,
    icon,
    content,
  }: {
    url: string;
    icon: IconType;
    content: string;
  }) => {

    const Icon = icon
    return (
      <a
        href={url}
        target="_blank"
        className="border md:border-4 border-secondary inline-flex items-center h-fit w-fit relative hover:w-32 hover:mr-5 group overflow-hidden rounded-full transition-all shadow-custom"
      >
          <span className="w-7 h-7 md:w-10 md:h-10 bg-secondary rounded-full flex justify-center items-center md:border-2 border border-primary">
            <Icon className="text-primary" />
          </span>
          
          <span
          className="w-32 text-secondary font-semibold bg-primary rounded-full h-full flex items-center -translate-x-10 pl-12 -z-10 absolute left-0 group-hover:translate-x-0 transition-transform"
          >
            {content}
          </span>
      </a>
    );
  };
  