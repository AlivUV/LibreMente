import NextLink from "next/link";
import {
  Button,
  ButtonProps,
  CircularProgress,
  Link,
  SxProps,
  Theme,
} from "@mui/material";
import { ContentTypes } from "./PsychologistList";
import { fetchScheduleByPsychologist } from "@/app/_utils/server actions/schedule";
import { useState } from "react";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

function ButtonTemplate({
  secondary,
  link,
  ...props
}: ButtonProps & { secondary?: boolean; link?: boolean }) {
  const style: SxProps<Theme> = { width: "50%" };
  if (!secondary) {
    style.my = 1;
    style.fontWeight = FontWeightValues.Extrabold;
  } else {
    style.my = 0.5;
    style.fontWeight = FontWeightValues.Regular;
  }
  style.width = link ? "100%" : "50%";
  return (
    <Button
      size="small"
      color={!secondary ? "secondary" : "info"}
      className={!secondary ? "card-btn" : undefined}
      sx={style}
      {...props}
    ></Button>
  );
}

export function ScheduleButton({
  psychologistSlug,
}: {
  psychologistSlug: string;
}) {
  return (
    <Link href={`/citas/agendar/${psychologistSlug}`} width="50%">
      <ButtonTemplate fullWidth link>
        Pedir Cita
      </ButtonTemplate>
    </Link>
  );
}

export function CommentsButton() {
  return <ButtonTemplate secondary>Ver Comentarios</ButtonTemplate>;
}

export function UpcomingAppointmentsButton({
  psychologistId,
}: {
  psychologistId: string;
}) {
  return (
    <Link href={`/citas?psychologist=${psychologistId}`} width="50%">
      <ButtonTemplate fullWidth link>
        Ver Citas programadas
      </ButtonTemplate>
    </Link>
  );
}

export function PreviousAppointmentsButton({
  psychologistId,
}: {
  psychologistId: string;
}) {
  return (
    <Link href={`/citas/historial?psychologist=${psychologistId}`} width="50%">
      <ButtonTemplate fullWidth link>
        Ver Historial de Citas
      </ButtonTemplate>
    </Link>
  );
}

export function SeeScheduleButton({
  psychologistId,
  setContent,
}: {
  psychologistId: string;
  setContent: ({ type, content }: { type: ContentTypes; content: any }) => void;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <ButtonTemplate
      secondary
      onClick={() => {
        setLoading(true);
        fetchScheduleByPsychologist(psychologistId)
          .then((schedule) =>
            setContent({
              content: [...schedule.days],
              type: ContentTypes.Schedule,
            })
          )
          .finally(() => setLoading(false));
      }}
    >
      Ver Agenda
      {loading && <CircularProgress size={20} color="secondary" />}
    </ButtonTemplate>
  );
}
