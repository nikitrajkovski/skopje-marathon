import {createContext, useState} from "react";

type AuthContextType = {
  authenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  user: any;
  setUser: (user: any) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

export const AuthenticationContext = createContext<AuthContextType>({
  authenticated: false,
  setAuthenticated: () => {},
  user: {},
  setUser: () => {},
  token: null,
  setToken: () => {},
});

export const AuthenticationProvider = ({children}: any) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthenticationContext.Provider value={{
      authenticated,
      setAuthenticated,
      user,
      setUser,
      token,
      setToken
    }}>
      {children}
    </AuthenticationContext.Provider>
  );
};