import { useContext } from "react";
import { AppContext } from "../context/Context";

// Hook pour utiliser le contexte
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error("useRefContext must be used within a RefProvider");
    }
    return context;
  };