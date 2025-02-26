export * from "@mui/material/styles";
export * from "@mui/material/Typography";
export * from "@mui/material/Button";
export * from "@mui/material/IconButton";
export * from "@mui/material/Badge";

declare module "@mui/material/styles" {
  interface Palette {
    text1: Palette["primary"];
    text2: Palette["primary"];
    contrast: Palette["primary"];
  }

  interface PaletteOptions {
    text1?: PaletteOptions["primary"];
    text2?: PaletteOptions["primary"];
    contrast?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsColorOverrides {
    text1: true;
    text2: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    contrast: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    contrast: true;
  }
}

declare module "@mui/material/Badge" {
  interface BadgePropsColorOverrides {
    badge: true;
  }
}
z;
