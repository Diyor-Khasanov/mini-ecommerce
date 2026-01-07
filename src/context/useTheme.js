import { useContext } from "react";
import ThemeContext from "./themeContext";

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    console.log('error')
  }

  return context;
};

export default useTheme;
