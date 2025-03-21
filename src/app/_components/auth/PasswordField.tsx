"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

export default function PasswordField({
  id,
  label,
  onChange,
  width,
}: {
  id: string;
  label: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  width?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <FormControl sx={{ width: width || "15rem" }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        onChange={onChange}
        id={id}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              type="button"
              aria-label={
                showPassword ? "hide the password" : "display the password"
              }
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
}
