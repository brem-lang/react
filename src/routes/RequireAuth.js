import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import { useSelector, useDispatch } from "react-redux";
import { miListData } from "../features/slip-list/slipListSlice";
import axios from "../api/axios";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const SlipData = useSelector((state) => state.slipList.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSlipList = async () => {
      if (Object.keys(auth).length === 0) return;
      if (SlipData?.slipState === false) return;

      const config = {
        headers: { Authorization: `Bearer ${auth.token}` },
      };

      try {
        const miData = await axios.get("/api/get/wsmi", config);
        const mroData = await axios.get("/api/get/wsmro", config);
        const dmData = await axios.get("/api/get/wsdm", config);
        const fgData = await axios.get("/api/get/wsfg", config);
        const faData = await axios.get("/api/get/wsfa", config);
        const maData = await axios.get("/api/get/wsma", config);
        const mrData = await axios.get("/api/get/memorandum", config);
        const scData = await axios.get("/api/get/servicecall", config);
        const miRData = await axios.get("/api/get/returnslip?form=mi", config);
        const mroRData = await axios.get(
          "/api/get/returnslip?form=mro",
          config
        );
        const dmRData = await axios.get("/api/get/returnslip?form=dm", config);
        const fgRData = await axios.get("/api/get/returnslip?form=fg", config);
        const faRData = await axios.get("/api/get/returnslip?form=fa", config);

        dispatch(
          miListData({
            ...SlipData,
            miList: miData.data.data,
            mroList: mroData.data.data,
            dmList: dmData.data.data,
            fgList: fgData.data.data,
            faList: faData.data.data,
            maList: maData.data.data,
            mrList: mrData.data.data,
            miRList: miRData.data,
            scList: scData.data,
            mroRList: mroRData.data,
            dmRList: dmRData.data,
            fgRList: fgRData.data,
            faRList: faRData.data,
            slipState: false,
          })
        );
      } catch (err) {
        if (err.code === "ERR_BAD_REQUEST") {
          alert("Error getting data, Unauthorized user!");
        }

        console.log(err);
      }
    };

    return getSlipList;
  }, [SlipData, auth, dispatch]);

  return auth?.status === true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
