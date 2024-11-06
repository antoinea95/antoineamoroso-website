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
    <header className="flex items-center justify-center fixed w-full left-0 z-20">
      <nav
        ref={navRef}
        className="w-fit bg-primary max-w-[400px] h-fit flex items-center gap-2 px-4  rounded-full border-[5px] sm:border-[7px] border-secondary shadow-custom font-semibold text-secondary"
      >
        <div className="w-1/2 bg-primary py-3 gap-2 flex items-center justify-between rounded-l-full">
          <NavLink name="Projects" />
          <NavLink name="Work" />
        </div>
        <div className="w-1/2 bg-primary py-3 gap-2 flex items-center justify-between rounded-r-full">
          <NavLink name="About" />
          <NavLink name="Contact" />
        </div>
      </nav>
    </header>
  );
};
