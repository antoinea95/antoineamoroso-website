

/**
 * `Stroke` is a component that renders an SVG to add a rounded, customizable stroke behind a given text. 
 * It can be used within any text tag to add a decorative outline effect.
 * 
 * @param props - Configuration options for the `Stroke` component.
 * @param {string} props.name - The text content to be displayed in the SVG.
 * @param {string} props.strokeWidth - Stroke width, specified in pixels (e.g., "stroke-[5px]").
 * @param {boolean} [props.isHover] - Optional; if true, displays the stroke only on hover.
 * 
 * @returns An SVG element with a rounded stroke effect positioned behind the text.
 */
export const Stroke = ({
  name,
  strokeWidth,
  isHover,
}: {
  name: string;
  strokeWidth: string;
  isHover?: boolean;
}) => {
  const svgClass = isHover
    ? "stroke-transparent  lg:group-hover:stroke-secondary lg:group-hover:drop-shadow-custom"
    : "stroke-secondary drop-shadow-custom";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 inset-0 -z-[1] w-full h-full ${strokeWidth} ${svgClass}`}
    >
      <text
        x="50%"
        y="53%"
        dy=".35em"
        text-anchor="middle"
        stroke-linejoin="round"
        stroke-linecap="round"
      >
        {name}
      </text>
    </svg>
  );
};
