import { Typography } from "@mui/material";
import { FontWeightValues } from "../_enums/FontWeightValues";

export default function PageHeader({
  header,
  color = "text1.main",
}: {
  header: string;
  color?: string;
}) {
  return (
    <Typography
      variant="h4"
      gutterBottom
      padding={5}
      color={color}
      sx={{ fontWeight: FontWeightValues.Bold }}
    >
      {header}
    </Typography>
  );
}
