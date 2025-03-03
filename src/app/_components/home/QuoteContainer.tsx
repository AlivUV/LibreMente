import { Box, Typography } from "@mui/material";

export default function QuoteContainer() {
  return (
    <Box py="5vw" px="20vw">
      <Typography variant="h4" color="primary.main" textAlign="center">
        “Mi cerebro es la clave
      </Typography>
      <Typography variant="h4" color="primary.main" textAlign="center">
        que define mi mente libre”.
      </Typography>
      <Typography
        variant="h4"
        color="secondary.main"
        textAlign="center"
        sx={{ transform: "translate(15rem)" }}
      >
        {"(Harry Houdini)."}
      </Typography>
    </Box>
  );
}
