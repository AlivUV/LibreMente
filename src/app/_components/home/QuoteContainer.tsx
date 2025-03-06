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
        left={"2rem"}
        paddingTop={"1rem"}
        sx={{ transform: "translate(min(35%, 15rem))" }}
      >
        {"(Harry Houdini)."}
      </Typography>
    </Box>
  );
}
