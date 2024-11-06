import { PropsWithChildren, useRef, useState } from "react";
import { AppContext } from "./Context";

// Créer le fournisseur de contexte
export const AppProvider = ({ children } : PropsWithChildren) => {

  const [heroPictureDimension, setHeroPictureDimension] = useState({width: 0, height: 0});

    const heroPictureRef = useRef<HTMLImageElement>(null);
    const navRef = useRef<HTMLElement>(null);
    
    return <AppContext.Provider value={{heroPictureRef, navRef, heroPictureDimension, setHeroPictureDimension}}>{children}</AppContext.Provider>;
  };
  