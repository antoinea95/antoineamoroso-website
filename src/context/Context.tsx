// context/RefProvider.tsx
import React, { createContext, Dispatch, SetStateAction } from "react";

// Définir l'interface du contexte
interface RefContextType {
  navRef: React.RefObject<HTMLElement> | null;
  isLargeScreen: boolean;
  setIsLargeScreen: Dispatch<SetStateAction<boolean>>;
}

// Créer le contexte
export const AppContext = createContext<RefContextType | null>(null);

interface NavigationContextProps {
  previousKey: string | null;
  currentKey: string | null;
}

export const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined
);
