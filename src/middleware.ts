import { Session } from "next-auth";
import { withAuth } from "next-auth/middleware";
import Roles from "./app/_enums/Roles";
import { NextResponse } from "next/server";
import { UserStates } from "./app/_enums/UserStates";

const allowedPaths = {
  Consultante: ["/citas", "/perfil", "/practicantes"],
  Practicante: [
    "/citas",
    "/perfil",
    "/consultantes",
    "/notas",
    "/agenda",
    "/pruebas",
  ],
  Tutor: ["/practicantes", "/perfil", "/citas", "/reportes", "/solicitudes"],
  Monitor: [
    "/tutores",
    "/perfil",
    "/citas",
    "/reportes",
    "/solicitudes",
    "/practicantes",
  ],
  Administrador: [
    "/reportes",
    "/perfil",
    "/citas",
    "/base_de_datos",
    "/solicitudes",
    "/practicantes",
  ],
  All: ["/ingresar", "/registro", "/practicantes"],
};

export default withAuth(
  function middleware(req) {
    const pathname = req.nextUrl.pathname;
    if (req.nextauth.token) {
      const session = req.nextauth.token as unknown as Session;
      if (
        session.user.state === UserStates.Inactivo &&
        pathname !== "/desactivado"
      ) {
        return NextResponse.redirect(new URL("/desactivado", req.nextUrl));
      } else {
        let myAllowedPaths: string[];
        switch (session.user.role) {
          case Roles.Consultante:
            myAllowedPaths = allowedPaths.Consultante;
            break;
          case Roles.Practicante:
            myAllowedPaths = allowedPaths.Practicante;
            break;
          case Roles.Tutor:
            myAllowedPaths = allowedPaths.Tutor;
            break;
          case Roles.Monitor:
            myAllowedPaths = allowedPaths.Monitor;
            break;
          case Roles.Administrador:
            myAllowedPaths = allowedPaths.Administrador;
            break;
        }
        if (pathname !== "/") {
          if (!myAllowedPaths.some((path) => pathname.startsWith(path))) {
            return NextResponse.redirect(new URL("/", req.nextUrl));
          }
        }
      }
    } else {
      if (pathname !== "/")
        if (!allowedPaths.All.some((path) => pathname.startsWith(path)))
          return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  },
  {
    callbacks: {
      authorized(params) {
        return true;
      },
    },
  }
);

//Matches every path except the home page and the following:
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images).*)",
  ],
};
