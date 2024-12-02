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
    <header className="flex items-center justify-center">
      <nav
        ref={navRef}
        className="w-fit h-fit flex items-center gap-2 rounded-full font-semibold fixed bg-primary border-secondary border-4 top-[10px] z-10"
        id="navbar"
      >
        <div className=" w-fit p-4 gap-3 flex items-center justify-between rounded-l-full">
          <NavLink name="Projects" />
          <NavLink name="Work" />
        </div>
        <div className=" w-fit p-4 gap-3 flex items-center justify-between rounded-r-full">
          <NavLink name="About" />
          <NavLink name="Contact" />
        </div>
      </nav>
    </header>
  );
};
