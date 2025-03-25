import { INote } from "@/app/_interfaces/INote";
import { filterNotes } from "@/app/_utils/server actions/note";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Pagination,
  Skeleton,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SearchField from "./SearchField";
import NoteFilters from "@/app/_enums/NoteFilters";
import styles from "@/app/_styles/notes/notesTest.module.css";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

export default function ListNotesPanel({
  checkNote,
  shouldUpdate,
  setShouldUpdate,
  filterPatient,
}: {
  checkNote: (note: INote) => void;
  shouldUpdate: boolean;
  setShouldUpdate: (shouldUpdate: boolean) => void;
  filterPatient?: boolean;
}) {
  const { data: session, status } = useSession();
  const [notes, setNotes] = useState([] as INote[]);
  const [filterBy, setFilterBy] = useState(NoteFilters.Title);
  const [filter, setFilter] = useState<string | Date>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (shouldUpdate && session) {
      setLoading(true);
      const updatePromise = filterNotes(
        session.psychologist?._id!,
        filter,
        filterBy,
        filterPatient ? session.appointmentPatientId : undefined
      );
      updatePromise
        .then((notes) => {
          setNotes(notes);
          setShouldUpdate(false);
        })
        .finally(() => setLoading(false));
    }
  }, [session, shouldUpdate, filter, filterBy, setShouldUpdate, filterPatient]);
  return (
    <div className={styles["notes-panel"]}>
      <SearchField
        setFilter={setFilter}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        trigger={setShouldUpdate}
        filterPatient={filterPatient}
      />
      <Divider />
      <List id={styles["notes-list"]}>
        {loading
          ? [0, 0, 0].map((value, index) => (
              <ListItem key={`list-item-${index}`}>
                <Skeleton />
              </ListItem>
            ))
          : notes.map((note) => (
              <ListItem disablePadding key={`list-item-${note._id!}`}>
                <ListItemButton onClick={() => checkNote({ ...note })}>
                  <ListItemText
                    sx={{
                      ".MuiListItemText-primary": {
                        fontWeight: FontWeightValues.Semibold,
                        color: "#666666",
                      },
                    }}
                    primary={note.title}
                    secondary={
                      <>
                        {`Consultante: ${note.patientName}`}
                        <br />
                        {`Fecha: ${new Date(note.createdAt!).toLocaleString()}`}
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
      </List>
      <Divider />
      <Pagination
        id={styles["pagination"]}
        count={1}
        color="secondary"
        sx={{ mt: "10px" }}
      />
    </div>
  );
}
