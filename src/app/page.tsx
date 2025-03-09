"use client";
import { Box, Button, Paper } from "@mui/material";
import BannerSection from "./_components/home/BannerSection";
import QuoteContainer from "./_components/home/QuoteContainer";
import BackgroundQuote from "./_components/home/BackgroundQuote";
import VideoContainer from "./_components/home/VideoContainer";
import Footer from "./_components/home/Footer";


export default function Home() {
  return (
    <Box sx={{ paddingTop: "6em" }}>
      <BannerSection />
      <QuoteContainer />
      <BackgroundQuote />
      <VideoContainer />
      <Footer />
    </Box>
  );
}

function Item(props: { item: { name: string; description: string } }) {
  return (
    <Paper sx={{ my: "5px" }}>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}
