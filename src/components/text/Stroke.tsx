import { useLayoutEffect, useRef, useState } from "react";

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
  const textRef = useRef<SVGTextElement>(null);
  const [fontSize, setFontSize] = useState<number>(16);

  useLayoutEffect(() => {
    const updateFontSize = () => {
      if (textRef.current) {
        const computedStyle = window.getComputedStyle(textRef.current);
        const parsedFontSize = parseFloat(computedStyle.fontSize);
        setFontSize(parsedFontSize);
      }
    };

    requestAnimationFrame(updateFontSize);
  }, [name]); // Recalcul si `name` change

  return (
    <div
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center -z-10"
      ref={divRef}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${svgClass} flex items-center justify-center overflow-visible`}
        width="100%"
        height="100%"
        style={{
          strokeWidth: `${fontSize * 0.2}px`, // Stroke épaisseur basée sur la taille de police
        }}
      >
        <text
          ref={textRef}
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
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
