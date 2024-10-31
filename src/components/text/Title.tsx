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
  fontSize,
  strokeWidth,
}: {
  content: string;
  headingLevel: ElementType;
  fontSize?: string;
  strokeWidth: string;
}) => {
  return (
    <Heading
      className={`text-primary px-3 py-1 ${
        fontSize ? fontSize : ""
      } w-fit relative text-nowrap leading-none tracking-tight`}
    >
      {content}
      <Stroke name={content} strokeWidth={strokeWidth} />
    </Heading>
  );
};


