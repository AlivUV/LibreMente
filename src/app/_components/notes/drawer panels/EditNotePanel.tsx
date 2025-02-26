import { INote } from "@/app/_interfaces/INote";
import { saveNote } from "@/app/_utils/server actions/note";
import { stripTags } from "@/app/_utils/html";
import { Button, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import styles from "@/app/_styles/notes/notesTest.module.css";
import { useEffect, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";
// import ReactQuill from "react-quill";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
  ],
};

export default function EditNotePanel({
  selectedNote,
  trigger,
}: {
  selectedNote?: INote;
  trigger: (value: boolean) => void;
}) {
  const { data: session } = useSession();
  const params = useParams<{ id?: string }>();
  const appointmentId = params.id;
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  function handleClick() {
    if (title !== "" && stripTags(content) !== "") {
      let note: INote;
      if (selectedNote) {
        note = { ...selectedNote, title: title, content: content };
      } else {
        note = {
          title: title,
          content: content,
          psychologist: session?.psychologist?._id!,
          patient: session?.appointmentPatientId!,
          patientName: session?.appointmentPatientName!,
          appointment: appointmentId,
        };
        setContent("");
        setTitle("");
      }
      toast
        .promise(saveNote(note), {
          pending: "Guardando nota...",
          success: "Nota guardada con éxito",
          error: "Ha ocurrido un error, por favor inténtalo nuevamente",
        })
        .then(() => trigger(true));
    }
  }
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

  return (
    <div className={styles["notes-panel"]}>
      <TextField
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ input: { fontWeight: FontWeightValues.Semibold } }}
      />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
      />
      <Button
        id="save-note-button"
        color="secondary"
        onClick={handleClick}
        sx={{ fontWeight: FontWeightValues.Semibold }}
      >
        {selectedNote ? "Editar" : "Guardar"}
      </Button>
    </div>
  );
}
