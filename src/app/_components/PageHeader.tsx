import { Typography } from "@mui/material";
import { FontWeightValues } from "../_enums/FontWeightValues";

export default function PageHeader({ header }: { header: string }) {
  return (
    <Typography
      variant="h4"
      gutterBottom
      padding={5}
      color="text1.main"
      sx={{ fontWeight: FontWeightValues.Bold }}
    >
      {header}
    </Typography>
  );
}
