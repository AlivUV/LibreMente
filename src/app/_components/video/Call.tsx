import { FC, useCallback, useEffect, useRef, useState } from "react";
import DailyIframe, { DailyCall } from "@daily-co/daily-js";
import { Box, IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
import { NoteAlt } from "@mui/icons-material";
import NotesDrawer from "../notes/NotesDrawer";

interface Props {
  room: any;
  setRoom: any;
  appointmentId: string;
  refreshData: any;
  token: string;
}

export const Call: FC<Props> = ({
  room,
  setRoom,
  appointmentId,
  refreshData,
  token,
}) => {
  const handleUpdateChecking = async () => {
    // await psiApi.put("/appointments", { id: appointmentId });
  };
  const { data: session, status } = useSession();
  const callRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [callFrame, setCallFrame] = useState<DailyCall | null>(null);

  const createAndJoinCall = useCallback(async () => {
    const oldCall = DailyIframe.getCallInstance();
    if (!oldCall) {
      console.log("Creando nuevo objeto call");
      const newCallFrame = DailyIframe.createFrame(callRef?.current, {
        iframeStyle: {
          height: "calc(100vh - 7px - 64px)",
          width: "100%",
          aspectRatio: "16 / 9",
          minHeight: "calc(100vh - 7px - 64px)",
          border: "0",
        },
        theme: {
          colors: {
            accent: "#e1e7e8",
            accentText: "#CC0000",
            background: "#CC0000",
            baseText: "#ffffff",
            backgroundAccent: "#ff5151",
            mainAreaBg: "#f3f3f3",
            mainAreaBgAccent: "#cecece",
            mainAreaText: "#6c6c6d",
          },
        },
        userName: session?.user.firstName!,
        showLeaveButton: true,
        showFullscreenButton: false,
      });
      console.log("callFrame Creado, es: " + newCallFrame);
      setCallFrame(newCallFrame);

      try {
        newCallFrame
          .join({ url: room, token: token })
          .then((value) => console.log(value))
          .catch((reason) => console.log(reason))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }

      const leaveCall = async () => {
        if (callFrame) await callFrame.destroy();
        setRoom(null);
        setCallFrame(null);
      };

      newCallFrame.on("left-meeting", leaveCall);
    } else {
      await oldCall.destroy();
      createAndJoinCall();
    }
  }, [session, callFrame, room, token, setCallFrame, setRoom]);

  /**
   * Initiate Daily iframe creation on component render if it doesn't already exist
   */
  useEffect(() => {
    console.log("callFrame en Call es: " + callFrame);
    if (status === "authenticated" && !callFrame && room) {
      createAndJoinCall();
    }
  }, [callFrame, createAndJoinCall, session, status, room]);

  return (
    <Box>
      <Box>
        {/* Daily iframe container */}
        <div ref={callRef} className="video">
          {session?.psychologist && (
            <>
              <IconButton
                disabled={open}
                color="secondary"
                id="button-notes"
                size="large"
                onClick={() => setOpen(true)}
              >
                <NoteAlt style={{ fontSize: "64px" }} />
              </IconButton>

              <NotesDrawer open={open} handleClose={() => setOpen(false)} />
            </>
          )}
        </div>
      </Box>
    </Box>
  );
};
