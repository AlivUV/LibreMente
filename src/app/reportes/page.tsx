import { Metadata } from "next";
import ReportsDisplay from "../_components/reports/ReportsDisplay";

export const metadata: Metadata = {
  title: "Reportes",
};

export default function ReportsPage() {
  return <ReportsDisplay />;
}
