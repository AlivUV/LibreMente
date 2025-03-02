import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import logoFooter from "@/../public/images/logo-footer.png";
import Image from "next/image";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import XIcon from "@mui/icons-material/X";
import { Facebook, Instagram, LinkedIn, YouTube } from "@mui/icons-material";
import { useState } from "react";
import CreditsDialog from "./CreditsDialog";

export default function Footer() {
  const [open, setOpen] = useState(false);
  return (
    <Box
      bgcolor="primary.main"
      color="primary.contrastText"
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{
        "*": {
          color: "inherit !important",
        },
      }}
    >
      <Grid container spacing={2} columns={17} px={7} py={3}>
        <Grid item xs={17} sm={6} lg={3}>
          <Image src={logoFooter} alt="Logo de Univalle" />
        </Grid>
        <Grid item xs={17} sm={6} lg={3}>
          <Typography fontWeight={FontWeightValues.Semibold}>
            Universidad del Valle:
          </Typography>
          <Typography>Cali - Colombia</Typography>
          <Typography>© 1994 - 2024</Typography>
        </Grid>
        <Grid item xs={17} sm={6} lg={3}>
          <Typography fontWeight={FontWeightValues.Semibold}>
            Dirección:
          </Typography>
          <Typography>Ciudad Universitaria Meléndez</Typography>
          <Typography>Calle 13 # 100-00</Typography>
          <br />
          <Typography>Sede San Fernando</Typography>
          <Typography>Calle 4B N° 36-00</Typography>
        </Grid>
        <Grid item xs={17} sm={6} lg={3}>
          <Typography fontWeight={FontWeightValues.Semibold}>PBX:</Typography>
          <Typography>+57 602 3212100</Typography>
          <br />
          <Typography fontWeight={FontWeightValues.Semibold}>
            Línea gratuita PQRS:
          </Typography>
          <Typography>018000 220021</Typography>
          <br />
          <Typography fontWeight={FontWeightValues.Semibold}>
            Apartado Aéreo:
          </Typography>
          <Typography>25360</Typography>
        </Grid>
        <Divider
          orientation="vertical"
          sx={{
            minHeight: "inherit",
            border: "1px solid white",
            height: "inherit",
            display: { xs: "none", lg: "block" },
          }}
        />
        <Grid item xs={17} sm={6} lg={4}>
          <Typography fontWeight={FontWeightValues.Semibold}>
            Redes Sociales:
          </Typography>
          <Stack
            direction="row"
            sx={{
              "*": {
                fontSize: "3rem",
              },
            }}
          >
            <Link href="https://www.instagram.com/univallecol?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
              <Instagram />
            </Link>
            <Link href="https://www.facebook.com/universidaddelvalle">
              <Facebook />
            </Link>
            <Link href="https://www.linkedin.com/school/universidad-del-valle/">
              <LinkedIn />
            </Link>
            <Link href="https://www.youtube.com/user/universidaddelvalle1">
              <YouTube />
            </Link>
            <Link href="https://x.com/univallecol">
              <XIcon />
            </Link>
          </Stack>
          <br />
          <Button
            variant="outlined"
            color="contrast"
            size="large"
            onClick={() => setOpen(true)}
          >
            Créditos
          </Button>
        </Grid>
      </Grid>
      <Typography alignContent="center" m={3}>
        Institución de educación superior sujeta a inspección y vigilancia por
        el ministerio de educación nacional
      </Typography>
      <CreditsDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}
