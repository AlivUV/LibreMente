import { createTheme } from "@mui/material";

export const selectedTheme = createTheme({
  palette: {
    background: {
      paper: "#004b70", // your color
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFF",
    },
  },
});

export const unselectedTheme = createTheme({
  palette: {
    background: {
      paper: "#CCCCCC", // your color
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
});
