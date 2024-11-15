import { useEffect, useRef, useState } from "react";

/**
 * `Stroke` is a component that renders an SVG to add a rounded, customizable stroke behind a given text.
 * It can be used within any text tag to add a decorative outline effect.
 *
 * @param {Object} props - Configuration options for the `Stroke` component.
 * @param {string} props.name - The text content to be displayed in the SVG.
 * @param {boolean} [props.isHover] - Optional; if true, displays the stroke only on hover.
 *
 * @returns An SVG element with a rounded stroke effect positioned behind the text.
 */
export const Stroke = ({
  name,
  isHover,
}: {
  name: string;
  isHover?: boolean;
}) => {
  const svgClass = isHover
    ? "stroke-transparent lg:group-hover:stroke-secondary lg:group-hover:drop-shadow-custom"
    : "stroke-secondary drop-shadow-custom";

  const divRef = useRef<HTMLDivElement>(null);
  const [divDimension, setDivDimension] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (divRef.current) {
      const { offsetWidth, offsetHeight } = divRef.current;
      setDivDimension({
        width: offsetWidth,
        height: offsetHeight,
      });
    }
  }, [name]); // Re-run the effect if `name` changes to recalculate dimensions

  return (
    <div
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center -z-10"
      ref={divRef}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={divDimension.width}
        height={divDimension.height}
        className={`${svgClass} flex items-center justify-center overflow-visible`}
        style={{
          strokeWidth: "clamp(5px, 0.2em, 15px)",
        }}
      >
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central" // Correction pour le centrage vertical
          strokeLinejoin="round"
          strokeLinecap="round"
          fontSize="inherit"
          paintOrder="stroke"
          fill="#f1f5f9"
        >
          {name}
        </text>
      </svg>
    </div>
  );
};
