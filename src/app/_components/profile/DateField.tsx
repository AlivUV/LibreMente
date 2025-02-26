import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { esES } from "@mui/x-date-pickers/locales";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";

export default function DateField({
  readOnly,
  defaultDate,
}: {
  readOnly: boolean;
  defaultDate: Date | undefined;
}) {
  const [date, setDate] = useState(defaultDate || null);
  useEffect(() => {
    if (defaultDate) {
      setDate(defaultDate);
    }
  }, [defaultDate]);
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={es}
      localeText={
        esES.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <DatePicker
        slotProps={{
          textField: {
            fullWidth: true,
            inputProps: {
              style: { fontWeight: FontWeightValues.Regular },
            },
            InputLabelProps: {
              style: { fontWeight: FontWeightValues.Regular },
            },
          },
        }}
        views={["day", "month", "year"]}
        label={"Fecha de Nacimiento"}
        name={"Fecha de Nacimiento"}
        readOnly={readOnly}
        value={date}
        onChange={(newDate) => {
          if (newDate) setDate(newDate);
        }}
      />
    </LocalizationProvider>
  );
}
