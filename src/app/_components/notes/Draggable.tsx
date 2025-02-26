import { Paper, PaperProps } from "@mui/material";
import React from "react";
import Draggable from "react-draggable";
import styles from "@/app/_styles/notes/notesTest.module.css";

export default function PaperComponent(props: PaperProps) {
  const nodeRef = React.useRef(null);
  return (
    <Draggable
      handle="#DialogTitle"
      cancel={'[class*="MuiDialogContent-root"]'}
      nodeRef={nodeRef}
    >
      <Paper {...props} ref={nodeRef} id={styles["dialog-paper"]} />
    </Draggable>
  );
}
