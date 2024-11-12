import { ElementType } from "react";
import { Stroke } from "./Stroke";

/**
 * `Title` is a component that renders a heading or paragraph with a stroke effect behind the text.
 * It allows customization of the text content, heading level, font size, and stroke width.
 *
 * @param {Object} props - The properties for the Title component.
 * @param {string} props.content - The text content to be displayed in the title.
 * @param {ElementType} props.headingLevel - The HTML heading level or element type (e.g., 'h1', 'p') for the title.
 * @param {string} [props.fontSize] - Optional; custom font size for the title.
 * @param {string} props.strokeWidth - The stroke width to be applied to the text, specified in pixels (e.g., "stroke-[20px]").
 *
 * @returns A styled heading or paragraph element with the specified text and stroke effect.
 */

export const Title = ({
  content,
  headingLevel: Heading,
}: {
  content: string;
  headingLevel: ElementType;
}) => {

  const titleSize = Heading === "h1" ? "clamp(2.3rem, 8vw, 15rem)": Heading === "h2" ? "clamp(2.3rem, 6vw, 12rem)" : Heading === "h3" ? "clamp(1rem, 3vw, 4rem)" : "clamp(16px, 5vw, 24px)"

  return (
    <div className={`relative inline-flex items-center justify-center leading-none tracking-tight whitespace-nowrap w-fit`} style={{
      fontSize: titleSize,
      fontWeight: Heading === "h1" ? "900" : "600",
      overflow: Heading === "span" ? "hidden" : "visible",
    }}>
      <Heading className={`text-primary ${Heading === "span" ?"p-[0.3em]" : "p-[0.15em]"} z-10`}>
        {content}
      </Heading>
      <Stroke name={content} />
    </div>
  );
};
