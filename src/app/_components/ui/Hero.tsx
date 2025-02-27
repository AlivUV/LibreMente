import React from "react";
import Button from "@mui/material/Button/Button";
import Typography from "@mui/material/Typography/Typography";
import NextLink from "next/link";
import { HeroLayout } from "./HeroLayout";

const backgroundImage = "/images/newBanner.jpg";

export const Hero = () => {
  return (
    <HeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ fontSize: { sm: 50 }, fontWeight: 500 }}
      >
        EstuMente
      </Typography>

      <Typography
        color="inherit"
        align="center"
        variant="h2"
        gutterBottom
        sx={{ fontSize: { sm: 30 }, fontWeight: 300 }}
      >
        Sanando Juntos
      </Typography>

      <NextLink href="/" passHref>
        <Button color="secondary" size="large" className="hero-btn">
          Comienza aquí
        </Button>
      </NextLink>
    </HeroLayout>
  );
};
