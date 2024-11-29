import { Stroke } from "../text/Stroke"

/**
 * `NavLink` is a component that renders a navigational link with a decorative SVG stroke behind the text. 
 * The stroke appears with a hover effect for a more engaging visual design.
 *
 * @param {Object} props - The properties for the NavLink component.
 * @param {string} props.name - The text to be displayed for the link.
 * 
 * @returns A JSX element containing an anchor (`<a>`) with a hoverable SVG stroke effect.
 */
export const NavLink = ({name} : {name: string}) => {

    return (
        <a
        href="#"
        className="lg:link-hover-effect relative px-1 group h-fit inline-flex font-extrabold text-secondary"
      >
        {name}
        <Stroke name={name} isHover />
      </a>
    )
}