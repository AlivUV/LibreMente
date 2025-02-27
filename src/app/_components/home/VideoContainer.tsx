import { Box, Typography } from "@mui/material";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import YouTubePlayer from "youtube-player";
import { useEffect } from "react";

export default function VideoContainer() {
  useEffect(() => {
    const player = YouTubePlayer("video-player", { videoId: "k47m3jbhumA" });
  }, []);

  return (
    <Box py={5} display="flex" flexDirection="column" alignItems="center">
      <Typography
        variant="h2"
        color="secondary.main"
        fontWeight={FontWeightValues.Extrabold}
        p={3}
        sx={{ width: "100%" }}
      >
        Blog informativo
      </Typography>
      <Box id="video-player" p={3} />
    </Box>
  );
}
