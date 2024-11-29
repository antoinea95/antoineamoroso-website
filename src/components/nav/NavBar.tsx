import { NavLink } from "./NavLink";
import { useAppContext } from "../../hooks/useAppContext";

/**
 * `NavBar` is a component that renders a navigation bar containing links to various sections of the application.
 * It provides a visually appealing and responsive layout with rounded edges and shadow effects.
 *
 * @returns A JSX element representing the navigation bar with links.
 */
export const NavBar = () => {
  const { navRef } = useAppContext();

  return (
    <header className="flex items-center justify-center fixed w-full left-0 z-10">
      <nav
        ref={navRef}
        className="w-fit h-fit flex items-center gap-2 px-4  rounded-full font-semibold bg-primary"
      >
        <div className="w-fit py-3 gap-3 flex items-center justify-between rounded-l-full">
          <NavLink name="Projects" />
          <NavLink name="Work" />
        </div>
        <div className="w-fit py-3 gap-3 flex items-center justify-between rounded-r-full">
          <NavLink name="About" />
          <NavLink name="Contact" />
        </div>
      </nav>
    </header>
  );
};
