import { MenuItem, TextField } from "@mui/material";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import GenderDialog from "./GenderDialog";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

const defaultOptions = ["Masculino", "Femenino", "Prefiero no decirlo"];

export default function GenderField({
  readOnly,
  defaultValue,
}: {
  readOnly?: boolean;
  defaultValue?: string;
}) {
  console.log("El género inical es:", defaultValue);
  const addOption = "Añadir género personalizado...";
  const [open, setOpen] = useState(false);
  const [customGender, setCustomGender] = useState("");
  console.log("Custom gender es:", customGender);
  const options = [...defaultOptions, customGender, addOption];
  const [selection, setSelection] = useState(options[2]);
  console.log("selection es:", selection);
  useEffect(() => {
    if (defaultValue) {
      if (!defaultOptions.includes(defaultValue)) {
        setCustomGender(defaultValue);
      }
      setSelection(defaultValue);
    }
  }, [defaultValue, setSelection]);
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    if (event.target.value === addOption) {
      setOpen(true);
    } else {
      console.log("reacciono");
      setSelection(event.target.value);
    }
  }

  return (
    <>
      <TextField
        select
        value={selection}
        onChange={handleChange}
        fullWidth
        label="Género"
        name="Género"
        InputProps={{
          readOnly,
          style: { fontWeight: FontWeightValues.Regular },
        }}
        InputLabelProps={{ style: { fontWeight: FontWeightValues.Regular } }}
      >
        {options
          .filter((option) => option.length > 0)
          .map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
      </TextField>
      <GenderDialog
        open={open}
        onClose={() => setOpen(false)}
        setGender={(gender) => {
          setCustomGender(gender);
          setSelection(gender);
        }}
      />
    </>
  );
}
