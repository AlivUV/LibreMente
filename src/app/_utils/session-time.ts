export function registerSessionTime(startDate: Date, userId: string) {
  const data = new FormData();
  data.set("userId", userId ?? "");
  data.set("timeSpent", String(new Date().getTime() - startDate.getTime()));
  console.log("mando beacon");
  navigator.sendBeacon("/api/session_time", data);
}
