import { Box } from "@mui/material";
import RoleCard from "./RoleCard";
import Roles from "@/app/_enums/Roles";

export default function RoleCardList({
  selectedRole,
  setSelectedRole,
}: {
  selectedRole: Roles;
  setSelectedRole: (role: Roles) => void;
}) {
  return (
    <Box display="flex" justifyContent="space-evenly" sx={{ py: 5 }}>
      <RoleCard
        role={Roles.Practicante}
        description="Uno de los roles más importantes de la plataforma.
                Un practicante puede configurar la disponibilidad de su agenda, asistir a citas programadas con
                consultantes y tomar notas durante las mismas"
        selection={selectedRole}
        setSelected={setSelectedRole}
      />
      <RoleCard
        role={Roles.Tutor}
        description="Un tutor tiene un número determinado de practicantes a su cargo. El tutor puede asistir
                a las citas de los practicantes y consultantes libremente, así como generar reportes para
                revisar su desempeño. Además, un tutor también puede aprobar la solicitud de cambio
                de rol de un practicante, así como darlo de baja y desactivarlo de la plataforma"
        selection={selectedRole}
        setSelected={setSelectedRole}
      />
      <RoleCard
        role={Roles.Monitor}
        description="El rol del monitor es muy similar al del tutor, pues éste también puede
                aprobar solicitudes de practicantes o darlos de baja, a la vez que puede generar reportes.
                La gran diferencia es que en lugar de tener practicantes a su cargo, un monitor supervisa
                un número determinado de tutores, permitiéndole aprobar sus solicitudes de cambio de rol y 
                darlos de baja también"
        selection={selectedRole}
        setSelected={setSelectedRole}
      />
    </Box>
  );
}
