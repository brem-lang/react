import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QRCode from "qrcode";

import axios, { APP_URL } from "../../api/axios";
import Spinner from "../../components/spinner/spinner.component";
import { SlipContext } from "../../context/slip-provider";
import useAuth from "../../hooks/useAuth";
import MroRPdf from "../../components/PDF/mroReturnPdf";
import DataTable from "react-data-table-component";
import RedirectError from "../../routes/RedirectError";

function MROReturnList() {
  const [isOpenPdf, setIsOpenPdf] = useState(false);
  const [item, setItem] = useState([]);
  const [generatedQR, setGeneratedQR] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();
  const { mroRList, setMroRList, isMroR, setIsMroR } = useContext(SlipContext);
  const [search, setSearch] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const redirectError = RedirectError();
  const itemArr = mroRList;

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
    if (isMroR === false) return;

    const config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };

    setIsLoading(true);
    try {
      const res = await axios.get("/api/get/returnslip?form=mro", config);
      setMroRList(res.data);
      setIsMroR(false);
      setFilteredData(res.data);
    } catch (err) {
      console.log(err.response);
      // switch (err.code) {
      //   case "ERR_BAD_REQUEST":
      //     return redirectError();

      //   default:
      //     return console.log(err, "default");
      // }
    }

    setIsLoading(false);
  }, [auth, setMroRList, isMroR, setIsMroR, redirectError]);

  const columns = [
    {
      name: "Document Series No",
      selector: (row) => row.document_series_no,
    },
    {
      name: "Department",
      selector: (row) => row.department,
    },
    {
      name: "MR Number",
      selector: (row) => row.mr_no,
    },
    {
      name: "Received by",
      selector: (row) => row.received_by,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          type="button"
          className="btn btn-outline-warning"
          onClick={(e) => handlePdf(e, row)}
        >
          <i className="fas fa-file-pdf info"></i>
        </button>
      ),
    },
  ];

  useEffect(() => {
    if (isMroR === true) {
      getSlipList();
    }
  }, [isMroR, getSlipList]);

  useEffect(() => {
    if (itemArr.length === 0) {
      getSlipList();
    }
  }, [itemArr, getSlipList]);
  useEffect(() => {
    const result = itemArr.filter((data) => {
      return data.document_series_no.match(search);
      // return data.document_series_no.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search, itemArr]);

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">
                Maintence, Repairs, Operations Return Slip
              </h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="#">Home</Link>
                </li>
                <li className="breadcrumb-item active">
                  Maintence, Repairs, Operations Return Slip
                </li>
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
        <section className="content">
          <MroRPdf code={generatedQR} item={item} close={closePdfForm} />
        </section>
      ) : (
        <section className="content">
          <div className="container-fluid">
            <div className="py-12">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="card">
                  <div className="card-header">
                    {/*  */}
                    <div className="card-tools">
                      <Link to="/mro-return" className="btn btn-success">
                        Add Slip
                      </Link>
                    </div>
                  </div>
                  <div className="card-body">
                    <DataTable
                      columns={columns}
                      data={filteredData}
                      pagination
                      fixedHeader
                      selectableRowsHighlight
                      highlightOnHover
                      subHeader
                      subHeaderComponent={
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-25 form-control"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      }
                    />
                    {/* <table
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
                        {itemArr.map((item) => {
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
                                  onClick={(e) => handlePdf(e, item)}
                                >
                                  <i className="fas fa-file-pdf info"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table> */}
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

export default MROReturnList;
