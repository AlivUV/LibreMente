"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import RequestModal from "./RequestModal";
import { IRequest } from "@/app/_interfaces/IRequest";
import Roles from "@/app/_enums/Roles";
import IUser from "@/app/_interfaces/IUser";
import { fetchUserById } from "@/app/_utils/server actions/user";
import { FILES } from "@/app/_utils/endpoints";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

export default function RequestTable({ requests }: { requests: IRequest[] }) {
  const [open, setOpen] = useState(false);
  const [requestIndex, setRequestIndex] = useState(-1);
  const [user, setUser] = useState<IUser | null>(null);
  const [documentSrc, setDocumentSrc] = useState("");
  const [loading, setLoading] = useState(true);
  console.log("Se llama la tabla");
  return (
    <>
      <RequestModal
        open={open}
        handleClose={() => setOpen(false)}
        index={requestIndex}
        requestList={requests}
        user={user}
        documentSrc={documentSrc}
        loading={loading}
      />
      <TableContainer>
        <Table>
          <TableHead
            sx={{
              "*": {
                backgroundColor: "#EA6F13",
                color: "white !important",
                borderLeft: 1,
                fontWeight: `${FontWeightValues.Semibold} !important`,
              },
            }}
          >
            <TableRow>
              <TableCell>Apellidos</TableCell>
              <TableCell>Nombres</TableCell>
              <TableCell>Rol solicitado</TableCell>
              <TableCell>Fecha solicitud</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              ".MuiTableCell-root": {
                color: "#666666",
              },
            }}
          >
            {requests.map((request, index) => (
              <TableRow
                key={`row${index}`}
                hover
                sx={{ cursor: "pointer", color: "#666666" }}
                onClick={() => {
                  setOpen(true);
                  setRequestIndex(index);
                  if (index !== -1) {
                    URL.revokeObjectURL(documentSrc);
                    setLoading(true);
                    Promise.all([
                      fetchUserById(requests[index].user).then((foundUser) =>
                        setUser(foundUser)
                      ),
                      fetch(
                        process.env.NEXT_PUBLIC_BASE_URL +
                          FILES +
                          "/" +
                          requests[index].supportingDocumentId
                      )
                        .then((response) => {
                          console.log(response);
                          return response.blob();
                        })
                        .then((blob) => {
                          const url = URL.createObjectURL(blob);
                          console.log("La url es:", url);
                          setDocumentSrc(url);
                        })
                        .catch((error) => console.log(error)),
                    ]).then(() => setLoading(false));
                  }
                }}
              >
                <TableCell>{request.lastName}</TableCell>
                <TableCell>{request.firstName}</TableCell>
                <TableCell>{request.requestedRole}</TableCell>
                <TableCell>
                  {new Date(request.createdAt!).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
