import { GetServerSideProps, Metadata, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { Box, Container, Grid } from "@mui/material";
// import { PatientLayout } from "../../../components/layout";
import PatientLayout from "@/app/_components/layout/PatientLayout";
import IUser from "@/app/_interfaces/IUser";
import { UploadProfilePicture } from "@/app/_components/profile/UploadProfilePicture";
import { PersonalInfo } from "@/app/_components/profile/PersonalInfo";
import { hasPendingRequests } from "../_utils/server actions/request";
import { useEffect, useState } from "react";
import ProfileDisplay from "../_components/profile/ProfileDisplay";
// import { dbPatients } from "../../../database";
// import {
//   PersonalInfo,
//   UploadProfilePicture,
// } from "../../../components/profile";

export const metadata: Metadata = {
  title: "Perfil",
};

export default function ProfilePage() {
  return <ProfileDisplay />;
}
