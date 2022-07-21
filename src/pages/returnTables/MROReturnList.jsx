import React, { useEffect } from "react";
import axios from "../../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { miListData } from "../../features/slip-list/slipListSlice";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function MROReturnList() {
  const { auth } = useAuth();
  const miSlipData = useSelector((state) => state.slipList.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMiSlipList = async () => {
      if (miSlipData?.mroRState === false) return;

      const config = {
        headers: { Authorization: `Bearer ${auth.token}` },
      };

      try {
        const res = await axios.get("/api/get/returnslip?form=mro", config);
        dispatch(
          miListData({ ...miSlipData, mroRList: res.data, mroRState: false })
        );
      } catch (err) {
        if (err.code === "ERR_BAD_REQUEST") {
          alert("Error getting data, Unauthorized user!");
        }

        console.log(err);
      }
    };

    return getMiSlipList;
  }, [auth.token, dispatch, miSlipData]);

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">MRO Return Slip Log</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="#">Home</Link>
                </li>
                <li className="breadcrumb-item active">MRO Return Slip Log</li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    DataTable with default features
                  </h3>
                </div>
                <div className="card-body">
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>Document Series No</th>
                        <th>Department</th>
                        <th>MR Number</th>
                        <th>Received by</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {miSlipData.mroRList.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.document_series_no}</td>
                            <td>{item.department}</td>
                            <td>{item.mr_no}</td>
                            <td>{item.received_by}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline-warning"
                                // onClick={(e) => handlePdf(e, item)}
                              >
                                <i className="fas fa-file-pdf info"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MROReturnList;
