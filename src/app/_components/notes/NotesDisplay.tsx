"use client";
import { INote } from "@/app/_interfaces/INote";
import { fetchNoteById } from "@/app/_utils/server actions/note";
import { Box } from "@mui/material";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PageHeader from "../PageHeader";
import EditNotePanel from "./drawer panels/EditNotePanel";
import styles from "@/app/_styles/notes/notesTest.module.css";
import ListNotesPanel from "./drawer panels/ListNotesPanel";

export default function Notas() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const noteId = searchParams.get("id");
  const { replace } = useRouter();

  const [selectedNote, setSelectedNote] = useState<INote | undefined>(
    undefined
  );
  useEffect(() => {
    if (noteId && !selectedNote) {
      fetchNoteById(noteId).then((note) => setSelectedNote(note));
    }
  }, [noteId, selectedNote, setSelectedNote]);

  function searchNote(note: INote) {
    const params = new URLSearchParams(searchParams);
    if (note) {
      params.set("id", note._id as string);
    } else {
      params.delete("id");
    }
    setSelectedNote(note);
    replace(`${pathname}?${params.toString()}`);
  }
  const [shouldUpdate, setShouldUpdate] = useState(true);
  return (
    <>
      <PageHeader header="Mis Notas" />
      <Box
        display="flex"
        flexDirection="row"
        width="100%"
        px={5}
        className={styles["content"]}
      >
        <Box className={styles["list-container"]}>
          <ListNotesPanel
            checkNote={searchNote}
            shouldUpdate={shouldUpdate}
            setShouldUpdate={setShouldUpdate}
          />
        </Box>
        <Box display="flex" flexGrow={1} className={styles["fill"]}>
          <EditNotePanel
            trigger={setShouldUpdate}
            selectedNote={selectedNote}
          />
        </Box>
      </Box>
    </>
  );
}
