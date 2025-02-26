import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession as authFunction } from "next-auth";

export function getMyServerSession() {
  console.log("obtengo la sesión");
  return authFunction(authOptions);
}
