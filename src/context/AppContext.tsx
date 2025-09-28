"use client";
import { UserData } from "@/types/users";
import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import AuthServices from "@/app/api/auth";

interface AppContextConfig {
  auth: UserData | null;

  setAuth: (data: UserData | null) => void;
}
export const AppContext = createContext<AppContextConfig>({
  auth: null,

  setAuth: () => {},
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<UserData | null>(null);

  const token = Cookies.get("token_auth");

  useEffect(() => {
    if (token) {
      AuthServices.verifyLogin({ token: token }).then((res: any) => {
        setAuth(res.user);
      });
    }
  }, [token]);

  const appValue = {
    auth,
    setAuth,
  };
  return <AppContext.Provider value={appValue}>{children}</AppContext.Provider>;
};
export default AppProvider;
