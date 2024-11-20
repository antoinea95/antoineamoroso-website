import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

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
    <main className="font-degular text-sm sm:text-base relative">
      <Outlet />
    </main>
  );
};
