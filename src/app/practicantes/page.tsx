import { Suspense } from "react";
import { Metadata, NextPage } from "next";

import PsiLayout from "@/app/_components/layout/PsiLayout";
import Box from "@mui/material/Box/Box";
import { PsychologistList } from "@/app/_components/psychologists/PsychologistList";
import {
  getPsychologistsByTutor,
  getPsychologists,
} from "../_database/daos/psychologistDao";
import Roles from "../_enums/Roles";
import { getMyServerSession } from "../_utils/next-auth";
import PageHeader from "../_components/PageHeader";

export const metadata: Metadata = {
  title: "Practicantes",
};

const SearchPage: NextPage = async () => {
  const session = await getMyServerSession();
  const psychologists =
    session?.user.role === Roles.Tutor
      ? await getPsychologistsByTutor(session.user._id!, true)
      : await getPsychologists(true);
  return (
    <PsiLayout title="PsicologicaMente" pageDescription="Sanando Juntos">
      <Box sx={{ margin: "80px auto", padding: "0px 30px" }}>
        <PageHeader header="Elige un practicante" />
        <Suspense fallback="Cargando...">
          <PsychologistList psychologists={psychologists} />
        </Suspense>
      </Box>
    </PsiLayout>
  );
};

export default SearchPage;
