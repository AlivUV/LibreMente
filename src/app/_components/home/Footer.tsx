import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
// import logoFooter from "@/../public/images/logo-color.png";
// import Image from "next/image";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import XIcon from "@mui/icons-material/X";
import { Facebook, Instagram, LinkedIn, YouTube } from "@mui/icons-material";
import { TikTokIcon } from "@/app/_icons";
import { useState } from "react";
import CreditsDialog from "./CreditsDialog";
import LinksOfInterest from "./FooterSections/LinksOfInterest";
import Regulations from "./FooterSections/Regulations";
import ContactInformation from "./FooterSections/ContactInformation";
import FurtherInformation from "./FooterSections/FurtherInformation";

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
      <Grid
        container
        spacing={3}
        columns={17}
        px={0}
        py={4}
        sx={{ padding: "auto", justifyContent: "center" }}
      >
        <Grid item xs={17} sm={6} lg={3}>
          <LinksOfInterest />
        </Grid>
        <Grid item xs={17} sm={6} lg={3}>
          <Regulations />
        </Grid>
        <Grid item xs={17} sm={6} lg={3}>
          <ContactInformation />
        </Grid>
        {/* <Divider
          orientation="vertical"
          sx={{
            minHeight: "inherit",
            border: "1px solid white",
            height: "inherit",
            display: { xs: "none", lg: "block" },
          }}
        /> */}
        <Grid item xs={17} sm={6} lg={3}>
          <FurtherInformation setOpen={setOpen} />
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
