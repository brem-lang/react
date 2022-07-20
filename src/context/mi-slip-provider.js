import { createContext, useState } from "react";

export const MISlipContext = createContext({
  miList: [],
  setMiList: () => [],
});

export const MISlipProvider = ({ children }) => {
  const [miList, setMiList] = useState([]);

  const value = { miList, setMiList };

  return (
    <MISlipContext.Provider value={value}>{children}</MISlipContext.Provider>
  );
};
