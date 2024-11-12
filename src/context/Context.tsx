// context/RefProvider.tsx
import React, { createContext, Dispatch, SetStateAction } from "react";

// Définir l'interface du contexte
interface RefContextType {
  heroPictureRef: React.RefObject<HTMLImageElement> | null;
  navRef: React.RefObject<HTMLElement> | null;
  heroPictureDimension: {width: number, height: number},
  setHeroPictureDimension: Dispatch<SetStateAction<{width: number, height: number}>>;
  isLargeScreen: boolean;
  setIsLargeScreen: Dispatch<SetStateAction<boolean>>;
}

// Créer le contexte
export const AppContext = createContext<RefContextType | null>(null);
