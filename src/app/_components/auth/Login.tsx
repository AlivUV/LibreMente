"use client";

import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import PasswordField from "./PasswordField";
import { ChangeEvent, useCallback, useState } from "react";
import GoogleButton from "./GoogleButton";
import { CancelOutlined, SendOutlined } from "@mui/icons-material";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setUserData((actualData) => {
      return {
        ...actualData,
        [evt.target.id]: evt.target.value,
      };
    });
  }, []);

  const handleSubmit = useCallback(() => {
    setSending(true);
    toast.loading("Intentando iniciar sesión...");
    setError("");
    signIn("credentials", {
      email: userData.email,
      password: userData.password,
      redirect: false,
    })
      .then((res) => {
        toast.dismiss();
        if (!res) {
          toast.error("El servidor no respondió correctamente");
          setError("Error al intentar iniciar sesión.");
        } else if (res.error) setError(res.error);
        else {
          toast.success("Bienvenido a Libremente.");
          router.push("/");
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Ocurrió un error al intentar iniciar sesión.");
        setError("Error al intentar iniciar sesión.");
      })
      .finally(() => {
        setSending(false);
      });
  }, [userData, router]);

  return (
    <Card
      sx={{
        margin: "auto",
        width: "40rem",
        minWidth: "15rem",
        maxWidth: "90rem",
        padding: "3rem",
        overflow: "visible",
      }}
    >
      <Typography
        variant="h4"
        textAlign={"center"}
        marginBottom={"1rem"}
        color={"primary.main"}
      >
        <b>Inicio de sesión</b>
      </Typography>
      <Grid container spacing={2} marginTop={"2rem"}>
        <Grid item xs={12}>
          <TextField
            id="email"
            sx={{ width: "32rem" }}
            type="email"
            label="Escriba aquí su correo electrónico"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordField
            id="password"
            width="32rem"
            label="Escriba aquí su contraseña"
            onChange={handleChange}
          />
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Typography
              color={"red"}
              justifySelf={"center"}
              marginTop={"-1rem"}
              marginBottom={"1rem"}
            >
              {error}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography>
            Aún no tienes una cuenta?{" "}
            <Link href="/registro" color="secondary">
              Registrate aquí
            </Link>
          </Typography>
          <Button
            href="/"
            color="primary"
            startIcon={<CancelOutlined />}
            sx={{
              fontWeight: FontWeightValues.Regular,
              marginTop: "1rem",
              width: "15rem",
            }}
            size="large"
            type="button"
            form="pruebaForm"
          >
            Cancelar
          </Button>
          <Button
            color="secondary"
            disabled={sending}
            startIcon={<SendOutlined />}
            sx={{
              fontWeight: FontWeightValues.Regular,
              marginTop: "1rem",
              marginLeft: "2rem",
              width: "15rem",
            }}
            size="large"
            type="button"
            form="pruebaForm"
            onClick={handleSubmit}
          >
            Ingresar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <GoogleButton width="32rem" />
        </Grid>
      </Grid>
    </Card>
  );
}
