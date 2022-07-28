import { createContext, useState } from "react";

const ErrorContext = createContext({});

export const ErrorProvider = ({ children }) => {
  const [unAuth, setUnAuth] = useState(false);

  return (
    <ErrorContext.Provider value={{ unAuth, setUnAuth }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContext;
