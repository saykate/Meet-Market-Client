import { extendTheme } from "@chakra-ui/react";

const customBreakpoints = {
  base: "0px",
  sm: "480px",
  custom: "575px", 
  md: "768px",
  lg: "992px",
  xl: "1200px",
  "2xl": "1536px",
};

const theme = extendTheme({
  breakpoints: customBreakpoints,
});

export default theme;
