import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { NavigationProvider } from "../context/NavigationProvider";

export const Root = () => {
  const location = useLocation();

  useEffect(() => {
    const handleReload = () => {
      if (location.pathname === "/" && window.scrollY === 0) {
        sessionStorage.removeItem("hasAnimationPlayed");
      }
    };

    window.addEventListener("beforeunload", handleReload);

    return () => window.removeEventListener("beforeunload", handleReload);
  }, [location.pathname]);

  return (
    <NavigationProvider>
      <main className="font-parkinsans text-sm sm:text-base relative overflow-x-hidden">
        <Outlet />
      </main>
    </NavigationProvider>
  );
};
