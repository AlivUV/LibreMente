import { Metadata } from "next";
import ProfileDisplay from "../_components/profile/ProfileDisplay";

export const metadata: Metadata = {
  title: "Perfil",
};

export default function ProfilePage() {
  return <ProfileDisplay />;
}
