"use client";

import axios from "axios";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
type User = {
  username: string;
  email: string;
  name: string;
  id: number;
};
type SessionContext = {
  user: User | null | undefined;
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
};
const SessionContext = createContext<SessionContext | undefined>(undefined);

function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("http://localhost:5000/api/user/@me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (e) {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
}
function useSession() {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("useSession should be used inside SessionProvider");
  }
  return session;
}

export { SessionProvider, SessionContext, useSession };
