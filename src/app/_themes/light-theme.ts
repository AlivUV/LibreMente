import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { LinkBehaviour } from "../_components/LinkBehavior";
import { blue } from "@mui/material/colors";

let lightTheme = createTheme({
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },
  palette: {
    mode: "light",
    primary: {
      main: "#004b70",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#EA6F13",
      contrastText: "#ffffff",
    },
    info: {
      main: "#CCCCCC",
      contrastText: "#333333",
    },
    success: {
      main: "#28a745",
    },
    error: {
      main: "#dc3545",
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour,
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: "fixed",
      },
      styleOverrides: {
        root: {
          backgroundColor: "#004b70",
        },
      },
    },

    MuiTypography: {
      defaultProps: {
        color: "text2.main",
      },
    },

    MuiButton: {
      defaultProps: {
        variant: "contained",
        size: "small",
        disableElevation: true,
        color: "info",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: 10,
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: "0px 5px 5px rgba(0,0,0,0.05)",
          borderRadius: "10px",
        },
      },
    },

    MuiAccordion: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          border: 0,
          "&:not(:last-child)": {
            borderBottom: 0,
          },
          "&:before": {
            display: "none",
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          border: "2px solid transparent",
          backgroundColor: "#EA6F13",
        },
      },
    },
  },
});

lightTheme = createTheme(lightTheme, {
  palette: {
    text1: lightTheme.palette.augmentColor({
      color: {
        main: "#333333",
      },
      name: "text1",
    }),
    text2: lightTheme.palette.augmentColor({
      color: {
        main: "#666666",
      },
      name: "text2",
    }),
    contrast: lightTheme.palette.augmentColor({
      color: {
        main: "#ffffff",
      },
      name: "contrast",
    }),
    badge: lightTheme.palette.augmentColor({
      color: {
        main: blue[500],
      },
    }),
  },
});

lightTheme = responsiveFontSizes(lightTheme);

export { lightTheme };
