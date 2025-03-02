import { Box, Typography } from "@mui/material";

export default function QuoteContainer() {
  return (
    <Box py="50px" px="20vw">
      <Typography variant="h5" color="text2.main" textAlign="center">
        “En terapia, he aprendido la importancia de mantener equilibradas la
        vida espiritual y la vida profesional. Necesito recuperar mi
        equilibrio”.
      </Typography>
      <Typography variant="h5" color="primary.main" textAlign="center">
        {"(Tiger Woods)."}
      </Typography>
    </Box>
  );
}
