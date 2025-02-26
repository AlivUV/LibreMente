import Roles from "../_enums/Roles";

export function homepagePath(role: Roles) {
  switch (role) {
    case Roles.Consultante:
      return "/citas";
    case Roles.Practicante:
      return "/citas";
    case Roles.Tutor:
      return "/practicantes";
    case Roles.Coordinador:
      return "/tutores";
    case Roles.Administrador:
      return "/reportes";
  }
}
