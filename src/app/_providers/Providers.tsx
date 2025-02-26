import ThemeRegistry from "@/app/_themes/ThemeRegistry";
import SessionProvider from "./SessionProvider";
import { UiContext } from "@/app/_contexts/ui/UiContext";
import UiProvider from "./UiProvider";
import SessionTimeProvider from "./SessionTimeProvider";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <ThemeRegistry options={{ key: "mui" }}>
      <SessionProvider>
        <UiProvider>
          <SessionTimeProvider>{children}</SessionTimeProvider>
        </UiProvider>
      </SessionProvider>
    </ThemeRegistry>
  );
}
