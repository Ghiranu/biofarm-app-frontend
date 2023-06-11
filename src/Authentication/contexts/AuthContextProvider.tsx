/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type AuthContextProps = {
  auth: {
    accessToken: string | null;
    roles: string;
  };
  setAuth: Dispatch<SetStateAction<any>>;
};

const AuthContext = createContext<AuthContextProps>({
  auth: { accessToken: "", roles: "" },
  setAuth: () => {},
});

type Props = {
  children: ReactNode;
};

export const AuthContextProvider: any = (props: Props) => {
  const [auth, setAuth] = useState({ accessToken: "", roles: "" });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
