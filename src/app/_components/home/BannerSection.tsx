import { Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Image from "next/image";
import Link from "next/link";

const getImages = (baseName: String) => {
  let i: number = 1;
  let images = [];
  try {
    let image;
    while (
      (image = require(`@/../public/images/banner/${baseName}${i++}.webp`))
    )
      images.push(image);
  } finally {
    return images;
  }
};

export default function BannerSection() {
  const banners = getImages("banner");
  return (
    <Carousel
      className="justAClassname"
      indicatorIconButtonProps={{
        style: {
          width: "2em",
          height: "2em",
          color: "#EA6F13",
          opacity: "42%",
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: "#E6B00B",
          opacity: "100%",
        },
      }}
      indicatorContainerProps={{
        style: {
          // marginTop: "-20%",
          zIndex: 1,
          position: "absolute",
        },
        className: "indicators",
      }}
      sx={{
        width: "100%",
        overflow: "visible",
        ".indicators svg": {
          fontSize: "2em",
        },
        mb: 5,
      }}
    >
      {banners.map((banner, index) => (
        <Box className="recursiveBox" display="flex" key={`banner${index}`}>
          <Link href={"/practicantes"} style={{ width: "100%" }}>
            <Image
              src={banner}
              alt="primer banner"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Link>
        </Box>
      ))}
    </Carousel>
  );
}
