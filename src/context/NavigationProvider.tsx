import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NavigationContext } from "./Context";

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const [currentKey, setCurrentKey] = useState<string | null>(location.key);
    const [previousKey, setPreviousKey] = useState<string | null>(null);
  
    useEffect(() => {
      const nextKey = location.key
      if(currentKey !== nextKey) {
        setCurrentKey(nextKey);
        setPreviousKey(currentKey)
      }
    }, [currentKey, location.key]);
  
    return (
      <NavigationContext.Provider value={{previousKey, currentKey }}>
        {children}
      </NavigationContext.Provider>
    );
  };