import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { AppContext } from "./Context";

// Créer le fournisseur de contexte
export const AppProvider = ({ children } : PropsWithChildren) => {

  const [heroPictureDimension, setHeroPictureDimension] = useState({width: 0, height: 0});
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [scrollY, setScrollY] = useState(window.scrollY);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


    const heroPictureRef = useRef<HTMLImageElement>(null);
    const navRef = useRef<HTMLElement>(null);
    
    return <AppContext.Provider value={{heroPictureRef, navRef, heroPictureDimension, setHeroPictureDimension, isLargeScreen, setIsLargeScreen, scrollY, setScrollY}}>{children}</AppContext.Provider>;
  };
  