"use client";
import { useState } from "react";
import { SessionTimeContext } from "../_contexts/SessionTimeContext";

export default function SessionTimeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sessionTime, setSessionTime] = useState<Date | undefined>();
  return (
    <SessionTimeContext.Provider value={{ sessionTime, setSessionTime }}>
      {children}
    </SessionTimeContext.Provider>
  );
}
