import { NavLink } from "./NavLink";

/**
 * `NavBar` is a component that renders a navigation bar containing links to various sections of the application. 
 * It provides a visually appealing and responsive layout with rounded edges and shadow effects.
 * 
 * @returns A JSX element representing the navigation bar with links.
 */
export const NavBar = () => {
  return (
    <nav className="bg-primary w-11/12 max-w-[370px] flex items-center justify-between px-6 py-2 sm:px-8 sm:py-3 rounded-full border-[5px] sm:border-[7px] border-secondary shadow-custom font-semibold text-secondary fixed left-1/2 -translate-x-1/2">
      <NavLink name="Projects" />
      <NavLink name="Work" />
      <NavLink name="About" />
      <NavLink name="Contact" />
    </nav>
  );
};
