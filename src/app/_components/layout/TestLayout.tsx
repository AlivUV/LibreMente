"use client";
import { useSession } from "next-auth/react";

export default function TestLayout({ title }: { title: string }) {
  const { data: session, status } = useSession();
  return (
    <div>
      <h1>{title}</h1>
      <h2>Usuario</h2>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
    </div>
  );
}
