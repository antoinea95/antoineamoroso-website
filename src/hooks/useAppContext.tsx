import { useContext } from "react";
import { AppContext } from "../context/Context";

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error("useRefContext must be used within a RefProvider");
    }
    return context;
  };