"use client";

import { Button, Typography } from "@mui/material";

export const SignInButton = () => {
  return (
    <Button
      variant="text"
      className="hero-btn"
      href="/ingresar"
      color="contrast"
      sx={{
        minWidth: "100px",
        minHeight: "inherit",
      }}
    >
      <Typography
        variant="h6"
        padding={"1rem"}
        color={"white"}
        sx={{
          backgroundColor: "secondary.main",
          borderRadius: "1.5rem",
        }}
      >
        Inicia sesión para poder pedir una cita
      </Typography>
    </Button>
  );
};
