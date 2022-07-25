import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import QRCode from "qrcode";

import axios, { APP_URL } from "../../api/axios";
import FgPdf from "../../components/PDF/fgPdf";
import useAuth from "../../hooks/useAuth";
import { SlipContext } from "../../context/slip-provider";
import Spinner from "../../components/spinner/spinner.component";

function FGSlipList() {
  const [isOpenPdf, setIsOpenPdf] = useState(false);
  const [item, setItem] = useState([]);
  const [generatedQR, setGeneratedQR] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();
  const { fgList, setFgList, isFg, setIsFg } = useContext(SlipContext);

  const itemArr = fgList;

  const handlePdf = (e, item) => {
    e.preventDefault();

    const rawCode = `${APP_URL}/verify?key=${item.document_series_no}`;

    setItem(item);
    QRCode.toDataURL(
      rawCode,
      {
        width: 800,
        margin: 2,
      },
      (err, url) => {
        if (err) return console.error(err);
        setGeneratedQR(url);
        setIsOpenPdf(true);
      }
    );
  };

  const closePdfForm = (e) => {
    setIsOpenPdf(false);
    setItem([]);
    setGeneratedQR("");
  };

  const getSlipList = useCallback(async () => {
    if (isFg === false) return;

    const config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };

    try {
      const res = await axios.get("/api/get/wsfg", config);
      setFgList(res.data.data);
      setIsFg(false);
    } catch (err) {
      if (err.code === "ERR_BAD_REQUEST") {
        alert("Error getting data, Unauthorized user!");
      }

      console.log(err);
    }

    setIsLoading(false);
  }, [auth, setFgList, isFg, setIsFg]);

  useEffect(() => {
    if (isFg === true) {
      getSlipList();
    }
  }, [isFg, getSlipList]);

  useEffect(() => {
    if (itemArr.length === 0) {
      getSlipList();
    }
  }, [itemArr, getSlipList]);

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">FG Slip Log</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">FG Slip Log</li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>

      {isLoading === true ? (
        <Spinner />
      ) : isOpenPdf ? (
        <FgPdf code={generatedQR} item={item} close={closePdfForm} />
      ) : (
        <section className="content">
          <div className="container-fluid">
            <div className="py-12">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="card">
                  <div className="card-header">
                    <div className="card-tools">
                      <Link to="/fg-slip" className="btn btn-success">
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
                        {itemArr.map((item) => {
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

export default FGSlipList;
