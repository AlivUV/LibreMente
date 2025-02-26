"use client";
import IUser from "@/app/_interfaces/IUser";
import { AuthLayout } from "./AuthLayout";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { UiContext } from "@/app/_contexts/ui/UiContext";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import { SideMenu } from "../ui/SideMenu/SideMenu";

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
