import { createContext } from "react";

export const SessionTimeContext = createContext<{
  sessionTime: Date | undefined;
  setSessionTime: (date: Date | undefined) => void;
}>({
  sessionTime: undefined,
  setSessionTime: () => {},
});
