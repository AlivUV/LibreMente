// import { NextRequest } from "next/server";
import { Session } from "next-auth";
import { withAuth } from "next-auth/middleware";
import Roles from "./app/_enums/Roles";
import path from "path";
import { NextResponse } from "next/server";
import { UserStates } from "./app/_enums/UserStates";
// import { getMyServerSession } from "./app/_utils/next-auth";

// export async function middleware(request: NextRequest) {
//   //   const session = await getMyServerSession();
//   console.log("Hola, soy el middleware, esta es la sesión:");
//   //   console.log(session);
// }

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
  All: ["/", "practicantes"],
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
        console.log("Pathname es:", pathname);
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
        myAllowedPaths.push("/");
        if (!myAllowedPaths.some((path) => pathname.startsWith(path))) {
          return NextResponse.redirect(new URL(myAllowedPaths[0], req.nextUrl));
        }
      }
    } else {
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
