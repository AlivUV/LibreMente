"use client";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import { INote } from "@/app/_interfaces/INote";
import {
  Box,
  Card,
  CardContent,
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
    // <Card className="summary-card">
    //   <CardContent>
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
              <ListItemText
                primary={note.title}
                //   secondary={
                //     <>
                //       {`Consultante: ${note.patientName}`}
                //       <br />
                //       {`Fecha: ${new Date(note.createdAt!).toLocaleString()}`}
                //     </>
                //   }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
    //   </CardContent>
    // </Card>
  );
}
