/**
 * `RoundLink` is a component that renders a rounded link with an icon and text that slides in on hover.
 *
 * @param {Object} props - The properties for the RoundLink component.
 * @param {string} props.url - The URL for the link.
 * @param {string} props.src - The source path for the icon image.
 * @param {string} props.content - The text content displayed within the link.
 *
 * @returns {JSX.Element} A rounded link with an image icon and sliding text effect on hover.
 */
export const RoundLink = ({
    url,
    src,
    content,
  }: {
    url: string;
    src: string;
    content: string;
  }) => {
    return (
      <a
        href={url}
        target="_blank"
        className="inline-flex max-w-9 h-9 items-center rounded-full relative drop-shadow-custom overflow-hidden group transition-all border-2 border-transparent hover:border-secondary hover:max-w-28 hover:mr-5"
      >
        <span className="flex items-center">
          <span className="w-8 h-8 flex justify-center items-center">
            <img src={src} alt={content} className="scale-[1.35] w-8 drop-shadow-custom" />
          </span>
          
          {/* Texte avec translation */}
          <span
            className="w-28 pl-10 pr-5 h-8 -z-10 text-secondary font-semibold bg-primary rounded-full flex items-center justify-center transition-transform transform group-hover:-translate-x-8 -translate-x-full"
          >
            {content}
          </span>
        </span>
      </a>
    );
  };
  