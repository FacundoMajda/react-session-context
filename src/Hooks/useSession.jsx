import { useContext } from "react";
import { SessionContext } from "../Context/authContext";

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession debe estar en AuthProvider");
  }
  return context;
}
