import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { AppContext } from "./Context";

// Créer le fournisseur de contexte
export const AppProvider = ({ children } : PropsWithChildren) => {

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


    const navRef = useRef<HTMLElement>(null);
    
    return <AppContext.Provider value={{navRef, isLargeScreen, setIsLargeScreen}}>{children}</AppContext.Provider>;
  };
  