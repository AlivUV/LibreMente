"use client";

import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import PasswordField from "./PasswordField";
import { ChangeEvent, useCallback, useState } from "react";
import GoogleButton from "./GoogleButton";
import { CancelOutlined, SendOutlined } from "@mui/icons-material";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/_utils/server actions/user";
import Link from "next/link";
import DropZone from "./DropZone";
import { passwordValidation } from "@/app/_validations/user";

export default function SignInForm() {
  const router = useRouter();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [file, setFile] = useState();
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({
    profileImage: "",
    firstName: "",
    lastName: "",
    email: "",
    password: [],
    confirmPassword: "",
  });

  const handlePasswordChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setErrors((actualData: any) => {
        const passwordErrors = passwordValidation(evt.target.value);
        if (passwordErrors) {
          return { ...actualData, password: passwordErrors };
        } else {
          return actualData;
        }
      });
      setUserData((actualData) => {
        return {
          ...actualData,
          [evt.target.id]: evt.target.value,
        };
      });
    },
    []
  );

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
    const formData = new FormData();
    formData.set("profilePicture", file as unknown as File);
    Object.entries(userData).forEach(([key, value]) => {
      formData.set(key, value);
    });
    registerUser(formData)
      .then(({ status, errors }) => {
        if (status === 200) return router.push("/ingresar");

        setErrors((state) => {
          Object.entries(errors!).forEach(([key, value]) => {
            state[key as keyof typeof state] = value as any;
          });
          return state;
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSending(false);
      });
  }, [userData, file, router]);

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
        <b>Registro de usuario</b>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DropZone
            propFileState={[file, setFile]}
            title="Cargar imagen de perfil"
          />
          {errors.profileImage && (
            <Typography
              color={"red"}
              justifySelf={"center"}
              marginTop={"-1rem"}
              marginBottom={"1rem"}
            >
              {errors.profileImage}
            </Typography>
          )}
        </Grid>
        <Grid container marginLeft={"1rem"}>
          <Grid item xs={6}>
            <TextField
              id="firstName"
              sx={{ width: "15rem" }}
              type="text"
              label="Escriba aquí sus nombres"
              onChange={handleChange}
            />
            {errors.firstName && (
              <Typography color={"red"}>{errors.firstName}</Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="lastName"
              sx={{ width: "15rem" }}
              type="text"
              label="Escriba aquí sus apellidos"
              onChange={handleChange}
            />
            {errors.lastName && (
              <Typography color={"red"}>{errors.lastName}</Typography>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            sx={{ width: "32rem" }}
            type="email"
            label="Escriba aquí su correo electrónico"
            onChange={handleChange}
          />
          {errors.email && (
            <Typography color={"red"}>{errors.email}</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <PasswordField
            id="password"
            width="32rem"
            label="Escriba aquí su contraseña"
            onChange={handlePasswordChange}
          />
          {errors.password &&
            errors.password.map((error) => (
              <Typography key={`passError${error}`} color={"red"}>
                {error}
              </Typography>
            ))}
        </Grid>
        <Grid item xs={12}>
          <PasswordField
            id="confirmPassword"
            width="32rem"
            label="Escriba nuevamente su contraseña"
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <Typography color={"red"}>{errors.confirmPassword}</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Ya tienes una cuenta?{" "}
            <Link href="/ingresar" color="secondary">
              Inicia sesión
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
            Registrarse
          </Button>
        </Grid>
        <Grid item xs={12}>
          <GoogleButton width="32rem" />
        </Grid>
      </Grid>
    </Card>
  );
}
