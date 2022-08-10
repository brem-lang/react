import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || true
  );

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, persist, setPersist, refresh, setRefresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
