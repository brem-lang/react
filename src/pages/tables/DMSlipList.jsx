import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DmPdf from "../../components/PDF/dmPdf";
import { miListData } from "../../features/slip-list/slipListSlice";
import useAuth from "../../hooks/useAuth";

import axios from "../../api/axios";

function DMSlipList() {
  const [isOpenPdf, setIsOpenPdf] = useState(false);
  const [item, setItem] = useState([]);

  const { auth } = useAuth();
  const miSlipData = useSelector((state) => state.slipList.value);
  const dispatch = useDispatch();

  const handlePdf = (e, item) => {
    e.preventDefault();
    setItem(item);
    setIsOpenPdf(true);
  };

  const closePdfForm = (e) => {
    setIsOpenPdf(false);
    setItem([]);
  };

  useEffect(() => {
    const getMiSlipList = async () => {
      if (miSlipData?.dmState === false) return;

      const config = {
        headers: { Authorization: `Bearer ${auth.token}` },
      };

      try {
        const res = await axios.get("/api/get/wsdm", config);
        dispatch(
          miListData({ ...miSlipData, dmList: res.data.data, dmState: false })
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
              <h1 className="m-0">DM Slip Log</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">DM Slip Log</li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>

      {isOpenPdf ? (
        <DmPdf
          code={item.document_series_no}
          item={item}
          close={closePdfForm}
        />
      ) : (
        <section className="content">
          <div className="container-fluid">
            <div className="py-12">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="card">
                  <div className="card-header">
                    <div className="card-tools">
                      <Link to="/dm-slip" className="btn btn-success">
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
                          <th>Document Series No</th>
                          <th>Prepared by</th>
                          <th>Approved by</th>
                          <th>Release by</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {miSlipData.dmList.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.document_series_no}</td>
                              <td>{item.prepared_by}</td>
                              <td>{item.approved_by}</td>
                              <td>{item.released_by}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-outline-warning"
                                  onClick={(e) => handlePdf(e, item)}
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
      )}
    </div>
  );
}

export default DMSlipList;
