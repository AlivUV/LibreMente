import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession as authFunction } from "next-auth";

export function getMyServerSession() {
  return authFunction(authOptions);
}
