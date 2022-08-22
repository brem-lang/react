import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import QRCode from "qrcode";
import useAuth from "../../hooks/useAuth";
import MiPdf from "../../components/PDF/miPdf";
import MIView from "../view/MIView";
import axios, { APP_URL } from "../../api/axios";
import Spinner from "../../components/spinner/spinner.component";
import DataTable from "react-data-table-component";

import { SlipContext } from "../../context/slip-provider";
import RedirectError from "../../routes/RedirectError";
import { ROLES } from "../../data/roles";

function MISlipList() {
  const [isOpenPdf, setIsOpenPdf] = useState(false);
  const [item, setItem] = useState([]);
  const [generatedQR, setGeneratedQR] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();
  const [search, setSearch] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { miList, setMiList, isMi, setIsMi } = useContext(SlipContext);
  const [isView, setIsView] = useState(false);
  const redirectError = RedirectError();

  const itemArr = miList;
  const allowedDashboard = [ROLES.administrator];

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

  const handleView = (e, item) => {
    e.preventDefault();
    setItem(item);
    setIsView(true);
  };

  const closePdfForm = (e) => {
    setIsOpenPdf(false);
    setItem([]);
    setGeneratedQR("");
  };

  const closeView = (e) => {
    setIsView(false);
    setItem([]);
  };

  const getSlipList = useCallback(async () => {
    if (isMi === false) return;
    const config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };

    setIsLoading(true);
    try {
      const res = await axios.get("/api/get/wsmi", config);
      setMiList(res.data.data);
      setIsMi(false);
      setFilteredData(res.data.data);
    } catch (err) {
      switch (err.code) {
        case "ERR_BAD_REQUEST":
          return redirectError();
        // return console.log("Request Error");

        default:
          return console.log(err, "default");
      }
    }
    setIsLoading(false);
  }, [auth, setMiList, isMi, setIsMi, redirectError]);

  const columns = [
    {
      name: "Document Series No",
      selector: (row) => row.document_series_no,
    },
    {
      name: "Prepared by",
      selector: (row) => row.prepared_by,
    },
    {
      name: "Approved by",
      selector: (row) => row.approved_by,
    },
    {
      name: "Release by",
      selector: (row) => row.released_by,
    },
    auth?.roles?.find((role) => allowedDashboard?.includes(role))
      ? {
          name: "Created By",
          selector: (row) => row.author,
        }
      : {},
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={(e) => handlePdf(e, row)}
            style={{ marginRight: 10 }}
          >
            <i className="fas fa-file-pdf info"></i>
          </button>

          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={(e) => handleView(e, row)}
          >
            <i className="fas fa-folder info"></i>
          </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (isMi === true) {
      getSlipList();
    }
  }, [isMi, getSlipList]);

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
              <h1 className="m-0">Merchandise Withdrawal Slip</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">
                  Merchandise Withdrawal Slip
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
          <MiPdf code={generatedQR} item={item} close={closePdfForm} />
        </section>
      ) : isView ? (
        <section className="content">
          <MIView item={item} close={closeView} />
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
                      <Link to="/mi-slip" className="btn btn-success">
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

export default MISlipList;
