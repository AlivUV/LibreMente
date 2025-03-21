import { Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function GoogleButton({ width }: { width?: string }) {
  return (
    <Button
      onClick={() => signIn("google")}
      sx={{
        marginTop: "1rem",
        width: width || "20rem",
        backgroundColor: "white",
        border: "1px solid #EA6F13",
        ":hover": {
          backgroundColor: "#EEEEEE",
        },
      }}
    >
      <Image
        width={30}
        height={30}
        src={require("@/../public/googleIcon.svg")}
        alt="google-logo"
      />
      <Typography paddingLeft={"1rem"} variant="body2">
        Ingresar con Google
      </Typography>
    </Button>
  );
}
