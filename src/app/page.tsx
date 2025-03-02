"use client";
import { Box, Button, Paper } from "@mui/material";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";
import QuoteContainer from "./_components/home/QuoteContainer";
import BackgroundQuote from "./_components/home/BackgroundQuote";
import VideoContainer from "./_components/home/VideoContainer";
import Footer from "./_components/home/Footer";

const getImages = (baseName: String) => {
  let i: number = 1;
  let images = [];
  try {
    let image;
    while ((image = require(`@/../public/images/${baseName}${i++}.jpg`)))
      images.push(image);
  } finally {
    return images;
  }
};

export default function Home() {
  const banners = getImages("banner");
  return (
    <Box sx={{ paddingTop: "6em" }}>
      <Carousel
        className="justAClassname"
        indicatorIconButtonProps={{
          style: {
            width: "2em",
            height: "2em",
            // color: "white",
          },
        }}
        // activeIndicatorIconButtonProps={{
        //   style: {
        //     color: "lightblue",
        //   },
        // }}
        indicatorContainerProps={{
          style: {
            // marginTop: "-20%",
            zIndex: 1,
            position: "absolute",
          },
          className: "indicators",
        }}
        sx={{
          overflow: "visible",
          ".indicators svg": {
            fontSize: "2em",
          },
          mb: 5,
        }}
      >
        {banners.map((banner, index) => (
          <Box className="recursiveBox" display="flex" key={`banner${index}`}>
            <Image
              src={banner}
              alt="primer banner"
              style={{ maxWidth: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        ))}
      </Carousel>
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
