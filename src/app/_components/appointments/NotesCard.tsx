"use client";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import { INote } from "@/app/_interfaces/INote";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function NotesCard({ notes }: { notes: INote[] }) {
  const router = useRouter();
  return (
    <Box>
      <Typography
        variant="h6"
        color="text2.main"
        fontWeight={FontWeightValues.Semibold}
      >
        Notas de la sesión
      </Typography>
      <Divider />
      <List sx={{ color: "#666666" }}>
        {notes.map((note) => (
          <ListItem disablePadding key={`list-item-${note._id!}`}>
            <ListItemButton
              onClick={() => router.push(`/notas?id=${note._id}`)}
            >
              <ListItemText primary={note.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
}
