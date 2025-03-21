import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import Roles from "@/app/_enums/Roles";
import { selectedTheme, unselectedTheme } from "@/app/_themes/role-cards-theme";
import { ThemeProvider } from "@emotion/react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

interface Props {
  role: Roles;
  description: string;
  selection: string;
  setSelected: (selection: Roles) => void;
}

export default function RoleCard({
  role,
  description,
  selection,
  setSelected,
}: Props) {
  const selected = selection === role;
  return (
    <ThemeProvider theme={selected ? selectedTheme : unselectedTheme}>
      <Card sx={{ maxWidth: "30%" }} onClick={() => setSelected(role)}>
        <CardActionArea
          id={role + "card"}
          sx={{ height: "100%", flexDirection: "column" }}
        >
          <CardContent>
            <Typography
              variant="h5"
              color="text.primary"
              fontWeight={FontWeightValues.Semibold}
            >
              {role}
            </Typography>
            <Typography
              color="text.secondary"
              fontWeight={FontWeightValues.Regular}
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
}
