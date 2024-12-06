import React, { createContext, Dispatch, SetStateAction } from "react";

interface RefContextType {
  navRef: React.RefObject<HTMLElement> | null;
  isLargeScreen: boolean;
  setIsLargeScreen: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<RefContextType | null>(null);

interface NavigationContextProps {
  previousKey: string | null;
  currentKey: string | null;
}

export const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined
);
