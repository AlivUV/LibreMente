import { Suspense } from "react";
import Notas from "../_components/notes/NotesDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notas",
};

export default function NotesPage() {
  return (
    <Suspense>
      <Notas />
    </Suspense>
  );
}
