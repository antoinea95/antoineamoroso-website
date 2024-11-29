import { useContext } from "react";
import { NavigationContext } from "../context/Context";

export const useNavigationContext = () => {
    const context = useContext(NavigationContext);
    if (!context) {
      throw new Error(
        "useNavigationContext must be used within a NavigationProvider"
      );
    }
    return context;
  };