import { INotification } from "@/app/_interfaces/INotification";
import { getNotificationLink } from "@/app/_utils/server actions/notification";
import { Clear } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import TimeAgo from "javascript-time-ago";
import es from "javascript-time-ago/locale/es";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function NotificationsList({
  notifications,
  handleClear,
  handleClose,
}: {
  notifications: INotification[];
  handleClear: (id: string, index: number, simpleClear: boolean) => void;
  handleClose: () => void;
}) {
  const router = useRouter();
  const currentTime = Date.now();
  TimeAgo.addDefaultLocale(es);
  const timeAgo = new TimeAgo("es");

  const handleClick = useCallback(
    (index: number) => {
      getNotificationLink(notifications[index]).then((link) => {
        handleClose();
        handleClear(
          notifications[index]._id!,
          index,
          notifications[index].simpleClear
        );
        router.push(link);
      });
    },
    [handleClose, handleClear, notifications, router]
  );

  return notifications.length > 0 ? (
    <List>
      {notifications.map((notification, index) => (
        <ListItem
          onClick={() => handleClick(index)}
          key={`Notificacion ${notification._id}`}
          sx={{ color: "#666666" }}
        >
          <ListItemAvatar>
            <Avatar
              src={notification.image}
              slotProps={{ img: { referrerPolicy: "no-referrer" } }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={notification.body}
            secondary={timeAgo.format(
              new Date(notification.createdAt!).getTime()
            )}
          />
          <IconButton
            onClick={() =>
              handleClear(notification._id!, index, notification.simpleClear)
            }
          >
            <Clear />
          </IconButton>
        </ListItem>
      ))}
    </List>
  ) : (
    <Typography sx={{ p: 2 }}>
      No tienes notificaciones nuevas en este momento
    </Typography>
  );
}
