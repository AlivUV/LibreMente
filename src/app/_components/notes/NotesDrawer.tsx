import PaperComponent from "@/app/_components/notes/Draggable";
import SlideTransition from "@/app/_components/notes/Transition";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  PaperProps,
  Slide,
  Tab,
  Tabs,
  withStyles,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { JSXElementConstructor, ReactElement, useState } from "react";
import Draggable from "react-draggable";
import SwipeableViews from "react-swipeable-views";
import EditNotePanel from "./drawer panels/EditNotePanel";
import ListNotesPanel from "./drawer panels/ListNotesPanel";
import MinimizeIcon from "@mui/icons-material/Minimize";
import "@/app/_styles/notes/notes-drawer.css";
import { INote } from "@/app/_interfaces/INote";
import { fetchNotesByPatient } from "@/app/_utils/server actions/note";
import { useSession } from "next-auth/react";
import styles from "@/app/_styles/notes/notesTest.module.css";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

export default function NotesDrawer({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const { data: session } = useSession();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [selectedNote, setSelectedNote] = useState<INote | undefined>(
    undefined
  );
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  function checkNote(note: INote) {
    setTabIndex(2);
    setSelectedNote(note);
  }
  return (
    <Dialog
      open={open}
      sx={{
        "& .MuiDialog-container": {
          justifyContent: "flex-end",
        },
      }}
      TransitionComponent={SlideTransition}
      PaperComponent={PaperComponent}
      aria-labelledby="DialogTitle"
      keepMounted
      disableEnforceFocus
      style={{ pointerEvents: "none" }}
      PaperProps={{ style: { pointerEvents: "auto" } }}
      hideBackdrop={true}
    >
      <DialogTitle id="DialogTitle" style={{ cursor: "move" }}>
        Notas
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
        color="secondary"
      >
        <MinimizeIcon />
      </IconButton>
      <DialogContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
        {/* Aquí va el componente Quill */}
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="basic tabs example"
          value={tabIndex}
          onChange={handleChange}
          variant="fullWidth"
          sx={{
            ".MuiTab-root": { fontWeight: FontWeightValues.Semibold },
          }}
        >
          <Tab label="Nueva nota" value={0} />
          <Tab label="Notas guardadas" value={1} />
          <Tab label="Ver nota" value={2} disabled />
        </Tabs>
        <SwipeableViews index={tabIndex} id={styles["swipeable-views"]}>
          <EditNotePanel trigger={setShouldUpdate} />
          <ListNotesPanel
            checkNote={checkNote}
            shouldUpdate={shouldUpdate}
            setShouldUpdate={setShouldUpdate}
            filterPatient
          />
          <EditNotePanel
            selectedNote={selectedNote}
            trigger={setShouldUpdate}
          />
        </SwipeableViews>
      </DialogContent>
    </Dialog>
  );
}
