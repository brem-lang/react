import React, { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { SlipContext } from "../../context/slip-provider";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { slipCount, setSlipCount, isSlipCount, setIsSlipCount } =
    useContext(SlipContext);

  const count = slipCount;

  const getdataCount = useCallback(async () => {
    if (isSlipCount === false) return;

    const config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };

    try {
      const res = await axios.get("/api/get/formcount", config);
      setSlipCount(res.data.data);
      setIsSlipCount(false);
      // setdmCount(res.data.data.dmCount);
      // setfaCount(res.data.data.faCount);
      // setfgCount(res.data.data.fgCount);
      // setmaCount(res.data.data.maCount);
      // setmemorandumCount(res.data.data.memorandumCount);
      // setmiCount(res.data.data.miCount);
      // setmroCount(res.data.data.mroCount);
      // setservicecallCount(res.data.data.servicecallCount);
    } catch (err) {
      if (err.code === "ERR_BAD_REQUEST") {
        // console.log("ERR_BAD_REQUEST");
        navigate("/login", { replace: true });
      }
      console.log(err);
    }
  }, [auth, setSlipCount, isSlipCount, setIsSlipCount, navigate]);

  useEffect(() => {
    if (isSlipCount === true) {
      getdataCount();
    }
  }, [isSlipCount, getdataCount]);

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="col-xs-4 text-center">
            <h1>Total Number of Forms Created</h1>
          </div>
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{count?.miCount ? count?.miCount : 0}</h3>

                  <p>MI</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{count?.mroCount ? count?.mroCount : 0}</h3>

                  <p>MRO</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{count?.dmCount ? count?.dmCount : 0}</h3>

                  <p>DM</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{count?.fgCount ? count?.fgCount : 0}</h3>

                  <p>FG</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{count?.faCount ? count?.faCount : 0}</h3>

                  <p>FA</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{count?.maCount ? count?.maCount : 0}</h3>

                  <p>MA</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{count?.memorandumCount ? count?.memorandumCount : 0}</h3>

                  <p>MR</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>
                    {count?.servicecallCount ? count?.servicecallCount : 0}
                  </h3>

                  <p>Service Call</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
