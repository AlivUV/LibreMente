import { createContext } from "react";

const ProfileFieldContext = createContext({
  updating: false,
  pendingRequest: false,
  setPendingRequest: (pendingRequest: boolean) => {},
  setModalOpen: (value: boolean) => {},
});

export default ProfileFieldContext;
