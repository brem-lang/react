import React, { useCallback, useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "../../api/axios";
import { SlipContext } from "../../context/slip-provider";
import useAuth from "../../hooks/useAuth";
import RedirectError from "../../routes/RedirectError";

const Dashboard = () => {
  const { auth } = useAuth();
  const { slipCount, setSlipCount, isSlipCount, setIsSlipCount } =
    useContext(SlipContext);

  const count = slipCount;
  const redirectError = RedirectError();

  const getdataCount = useCallback(async () => {
    if (isSlipCount === false) return;

    const config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };

    try {
      const res = await axios.get("/api/get/formcount", config);
      const forms = await axios.get("/api/document/list", config);
      setSlipCount(res.data.data);
      setIsSlipCount(false);
      console.log(forms.data.data);
    } catch (err) {
      switch (err.code) {
        case "ERR_BAD_REQUEST":
          return redirectError();

        default:
          return console.log(err, "ERROR");
      }
    }
  }, [auth, setSlipCount, isSlipCount, setIsSlipCount, redirectError]);

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
      <div className="container-fluid">
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">FORMS</h3>
                <div className="card-tools">
                  <button
                    className="btn btn-block btn-outline-info"
                    // onClick={() => syncData()}
                  >
                    <i class="fas fa-sync"></i>
                  </button>
                </div>
              </div>

              <div className="card-body">
                {/* {isLoading ? (
                  <Spinner />
                ) : ( */}
                <DataTable
                  // columns={columns}
                  // data={filteredData}
                  pagination
                  selectableRowsHighlight
                  highlightOnHover
                />
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
