import { getUserById } from "@/app/_database/daos/userDao";
import { IRequest } from "@/app/_interfaces/IRequest";
import { FILES } from "@/app/_utils/endpoints";
import Avatar from "@mui/material/Avatar/Avatar";
import Button from "@mui/material/Button/Button";
import Grid from "@mui/material/Grid/Grid";
import Link from "next/link";

function RequestField({
  field,
  value,
}: {
  field: string;
  value?: string | JSX.Element;
}) {
  return (
    <>
      <Grid item xs={5}>
        {field}
      </Grid>
      <Grid item xs={6}>
        {value}
      </Grid>
    </>
  );
}

export default async function RequestForm({ request }: { request: IRequest }) {
  const user = await getUserById(request.user);
  const documentSrc = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL +
      FILES +
      "/" +
      request.supportingDocumentId,
  )
    .then((response) => response.blob())
    .then((blob) => URL.createObjectURL(blob));
  return (
    <>
      <RequestField
        field="Foto de perfil:"
        value={
          <Avatar
            src={user?.profilePicture}
            slotProps={{ img: { referrerPolicy: "no-referrer" } }}
            sx={{ width: 90, height: 90 }}
            variant="square"
          />
        }
      />
      <RequestField field="Nombres:" value={request.firstName} />
      <RequestField field="Apellidos:" value={request.lastName} />
      <RequestField field="Correo electrónico:" value={user?.email} />
      <RequestField field="Rol solicitado:" value={request.requestedRole} />
      <RequestField
        field="Fecha solicitud:"
        value={request.createdAt?.toString()}
      />
      <RequestField
        field="Documento Soporte:"
        value={
          documentSrc !== "" ? (
            <Link target="_blank" href={documentSrc}>
              <Button color="secondary">Ver</Button>
            </Link>
          ) : (
            <Button color="secondary" disabled>
              Ver
            </Button>
          )
        }
      />
    </>
  );
}
