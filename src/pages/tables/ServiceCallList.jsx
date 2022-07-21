import React, { useEffect } from "react";
import axios from "../../api/axios";
import { useSelector, useDispatch } from "react-redux";
// import BasicDocument from "../../components/PDF/basic-document";

import { miListData } from "../../features/slip-list/slipListSlice";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function ServiceCallList() {
  const { auth } = useAuth();
  const miSlipData = useSelector((state) => state.slipList.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMiSlipList = async () => {
      if (miSlipData?.scState === false) return;

      const config = {
        headers: { Authorization: `Bearer ${auth.token}` },
      };

      try {
        const res = await axios.get("/api/get/servicecall", config);
        dispatch(
          miListData({ ...miSlipData, scList: res.data.data, scState: false })
        );
      } catch (err) {
        if (err.code === "ERR_BAD_REQUEST") {
          alert("Error getting data, Unauthorized user!");
        }

        console.log(err);
      }
    };

    return getMiSlipList;
  }, [auth.token, miSlipData, dispatch]);

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Service Call Log</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Service Call Log</li>
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
                  <div className="card-tools">
                    <Link to="/service-call" className="btn btn-success">
                      Add Slip
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>Customer Name</th>
                        <th>Contact Number</th>
                        <th>Serial Number</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {miSlipData.scList.map((item) => {
                        return (
                          <tr key={item.item_no}>
                            <td>{item.customer_name}</td>
                            <td>{item.contact_number}</td>
                            <td>{item.serial_no}</td>
                            <td>{item.status}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline-warning"
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

export default ServiceCallList;
