import { NavLink } from "./NavLink";
import { useAppContext } from "../../hooks/useAppContext";
import LanguageSelector from "./LanguageSelector";

/**
 * `NavBar` is a component that renders a navigation bar containing links to various sections of the application.
 * It provides a visually appealing and responsive layout with rounded edges and shadow effects.
 *
 * @returns A JSX element representing the navigation bar with links.
 */
export const NavBar = () => {
  const { navRef } = useAppContext();

  return (
    <>
    <header className="flex items-center justify-center fixed w-[90%] left-1/2 -translate-x-1/2 z-10 pt-3 lg:pt-0">
      <nav
        ref={navRef}
        className="h-fit flex items-center justify-between px-2 py-4 lg:px-4 rounded-full font-semibold bg-primary text-xs lg:text-base"
        id="navbar"
      >
        <div className="pl-0.5 lg:pl-2 gap-0.5 lg:gap-2 flex items-center justify-between rounded-l-full">
          <NavLink name="Projects" />
          <NavLink name="Work" />
        </div>
        <div className="pl-0.5 lg:pl-2 gap-0.5 lg:gap-2 flex items-center justify-between rounded-r-full">
          <NavLink name="About" />
          <NavLink name="Contact" />
        </div>
      </nav>
      <LanguageSelector />
    </header>
    </>
  );
};
