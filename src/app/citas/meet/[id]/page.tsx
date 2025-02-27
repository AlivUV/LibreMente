import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import PatientLayout from "@/app/_components/layout/PatientLayout";
import CallDisplay from "@/app/_components/video/CallDisplay";
import { getUpcomingAppointmentById } from "@/app/_database/daos/upcomingAppointmentDao";
import { requestToken } from "@/app/_utils/server actions/other";
import { Metadata, NextPage } from "next";
import { getServerSession } from "next-auth";
import Roles from "@/app/_enums/Roles";
import { IPreviousAppointment } from "@/app/_interfaces/IPreviousAppointment";
import { getPreviousAppointmentById } from "@/app/_database/daos/previousAppointmentDao";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sesión",
};

const prueba = "https://estumente.daily.co/prueba";

interface Props {
  params: { id: string };
}

const MeetPage: NextPage<Props> = async ({ params }) => {
  let pastAppointment: IPreviousAppointment | null;
  const appointment = await getUpcomingAppointmentById(params.id);
  if (!appointment) {
    pastAppointment = await getPreviousAppointmentById(params.id);
    if (!pastAppointment) redirect("/citas");
  }
  console.log("El appointment que recibo es:");
  console.log(appointment);
  const session = await getServerSession(authOptions);
  console.log("Y esta es la session");
  console.log(session?.user);
  function canJoin() {
    switch (session?.user.role) {
      case Roles.Consultante:
        return session.user._id === appointment?.patient;
      case Roles.Practicante:
        return session.psychologist?._id === appointment?.psychologist;
      default:
        return true;
    }
  }
  const token = canJoin() ? await requestToken(appointment?.roomName!) : "";
  return (
    <PatientLayout title="Sesión" pageDescription="Sesión iniciada">
      <CallDisplay
        appointment={appointment ?? pastAppointment!}
        token={token!}
      />
    </PatientLayout>
  );
};

export default MeetPage;
