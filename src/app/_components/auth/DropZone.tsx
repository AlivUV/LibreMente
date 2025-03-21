import { imgToWebp } from "@/app/_utils/imgConvert";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

function DropZone({
  propFileState,
  title,
}: {
  propFileState: any;
  title: any;
}) {
  const [fileState, setFileState] = propFileState;

  const handleChange = ({ target }: { target: any }) => {
    let file = target.files[0];

    if (!file) {
      // Code in case that the file was not been uploaded.
      return;
    }

    if (!/image\/*/.test(file.type)) {
      console.log("The file type is not supported");
      return;
    }

    imgToWebp(file, setFileState);
  };

  return (
    <Box
      sx={{
        width: "15rem",
        height: "13rem",
        position: "relative",
        textAlign: "center",
        borderStyle: "dashed",
        borderRadius: "2rem",
        borderColor: "#EA6F13",
        marginInline: "auto",
        marginY: "1rem",
        padding: "1rem",
      }}
    >
      <Typography
        variant="h6"
        textAlign={"center"}
        marginBottom={"0.1rem"}
        color={"primary.main"}
        fontSize={"1rem !important"}
      >
        {title}
      </Typography>
      {!fileState ? (
        <svg
          color="#004b70"
          xmlns="http://www.w3.org/2000/svg"
          className="h-40 w-40"
          fill="none"
          viewBox="0 0 24 17"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      ) : (
        <>
          <Image
            src={fileState.url}
            alt={fileState.name}
            width={150}
            height={150}
            style={{
              maxWidth: "100%",
              maxHeight: "300px",
              border: "2px solid #EA6F13",
              borderRadius: "50%",
            }}
          />
        </>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
          opacity: 0,
        }}
      />
    </Box>
  );
}

export default DropZone;
export { DropZone };
