import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function SectionWrapper({
  title,
  filter,
  children,
}: {
  title: string;
  filter?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Box m={2} p={2} sx={{ border: 1, borderRadius: 3 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="h5"
          color="text2.main"
          fontWeight={FontWeightValues.Bold}
        >
          {title}
        </Typography>
        {filter}
      </Box>

      <Box p={2} display="flex" flexDirection="row" flexWrap="wrap">
        {children}
      </Box>
    </Box>
  );
}
