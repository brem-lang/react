import { createContext, useState } from "react";

export const SlipContext = createContext({
  miList: [],
  setMiList: () => [],
});

export const SlipProvider = ({ children }) => {
  const [slipCount, setSlipCount] = useState([]);
  const [isSlipCount, setIsSlipCount] = useState(true);

  const [miList, setMiList] = useState([]);
  const [isMi, setIsMi] = useState(true);

  const [mroList, setMROList] = useState([]);
  const [isMro, setIsMro] = useState(true);

  const [dmList, setDmList] = useState([]);
  const [isDm, setIsDm] = useState(true);

  const [faList, setFaList] = useState([]);
  const [isFa, setIsFa] = useState(true);

  const [fgList, setFgList] = useState([]);
  const [isFg, setIsFg] = useState(true);

  const [maList, setMaList] = useState([]);
  const [isMa, setIsMa] = useState(true);

  const [mrList, setMrList] = useState([]);
  const [isMr, setIsMr] = useState(true);

  const [scList, setScList] = useState([]);
  const [isSc, setIsSc] = useState(true);

  // Return List
  const [miRList, setMiRList] = useState([]);
  const [isMiR, setIsMiR] = useState(true);

  const [mroRList, setMroRList] = useState([]);
  const [isMroR, setIsMroR] = useState(true);

  const [dmRList, setDmRList] = useState([]);
  const [isDmR, setIsDmR] = useState(true);

  const [fgRList, setFgRList] = useState([]);
  const [isFgR, setIsFgR] = useState(true);

  const [faRList, setFaRList] = useState([]);
  const [isFaR, setIsFaR] = useState(true);

  const [maRList, setMaRList] = useState([]);
  const [isMaR, setIsMaR] = useState(true);

  //edit
  const [edit, setEdit] = useState([]);
  const [isEdit, setIsEdit] = useState(true);

  // const [dmList, setDmList] = useState([]);
  // const [isDm, setIsDm] = useState(true);

  const value = {
    slipCount,
    setSlipCount,
    isSlipCount,
    setIsSlipCount,
    miList,
    setMiList,
    isMi,
    setIsMi,
    mroList,
    setMROList,
    isMro,
    setIsMro,
    dmList,
    setDmList,
    isDm,
    setIsDm,
    faList,
    setFaList,
    isFa,
    setIsFa,
    fgList,
    setFgList,
    isFg,
    setIsFg,
    maList,
    setMaList,
    isMa,
    setIsMa,
    mrList,
    setMrList,
    isMr,
    setIsMr,
    scList,
    setScList,
    isSc,
    setIsSc,
    miRList,
    setMiRList,
    isMiR,
    setIsMiR,
    mroRList,
    setMroRList,
    isMroR,
    setIsMroR,
    dmRList,
    setDmRList,
    isDmR,
    setIsDmR,
    fgRList,
    setFgRList,
    isFgR,
    setIsFgR,
    faRList,
    setFaRList,
    isFaR,
    setIsFaR,
    maRList,
    setMaRList,
    isMaR,
    setIsMaR,
    edit,
    setEdit,
    isEdit,
    setIsEdit,
  };

  return <SlipContext.Provider value={value}>{children}</SlipContext.Provider>;
};
