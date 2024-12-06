import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { AppContext } from "./Context";


export const AppProvider = ({ children } : PropsWithChildren) => {

  // State to handle responsive design specially for GSAP Animation
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);


  // Listening resize event
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


    // Ref for the navbar to synchronize GSAP Scroll Animation in hero
    const navRef = useRef<HTMLElement>(null);
    
    return <AppContext.Provider value={{navRef, isLargeScreen, setIsLargeScreen}}>{children}</AppContext.Provider>;
  };
  