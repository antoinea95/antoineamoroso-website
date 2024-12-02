import { PropsWithChildren } from "react";

/**
 * `Section` is a component that renders a styled section element.
 * It is used to wrap and center its child elements within a bordered area.
 *
 * @param {PropsWithChildren} props - The properties for the Section component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the section.
 *
 * @returns A section element containing the provided children, styled with a border and flex properties.
 */
export const Section = ({id, children }: PropsWithChildren<{id: string}>) => {
  return (
    <section className="w-[90%] m-auto flex flex-col items-center justify-evenly gap-32 py-10" id={id}>
      {children}
    </section>
  );
};
