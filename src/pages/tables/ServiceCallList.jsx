import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import QRCode from "qrcode";

import axios, { APP_URL } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { SlipContext } from "../../context/slip-provider";
import Spinner from "../../components/spinner/spinner.component";
import ScRPdf from "../../components/PDF/scReturnPdf";
import DataTable from "react-data-table-component";

function ServiceCallList() {
  const [isOpenPdf, setIsOpenPdf] = useState(false);
  const [item, setItem] = useState([]);
  const [generatedQR, setGeneratedQR] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const { scList, setScList, isSc, setIsSc } = useContext(SlipContext);
  const [search, setSearch] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const itemArr = scList;

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

  const ResetUser = useCallback(() => {
    setAuth({});
    localStorage.removeItem("user");

    return navigate("/login", { replace: true });
  }, [setAuth, navigate]);

  const getSlipList = useCallback(async () => {
    if (isSc === false) return;

    const config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };

    setIsLoading(true);
    try {
      const res = await axios.get("/api/get/servicecall", config);
      setScList(res.data.data);
      setIsSc(false);
      setFilteredData(res.data.data);
    } catch (err) {
      switch (err.code) {
        case "ERR_BAD_REQUEST":
          return ResetUser();

        default:
          return console.log(err, "default");
      }
    }

    setIsLoading(false);
  }, [auth, setScList, isSc, setIsSc, ResetUser]);

  const columns = [
    {
      name: "Customer Name",
      selector: (row) => row.document_series_no,
    },
    {
      name: "Contact Number",
      selector: (row) => row.name_of_employee,
    },
    {
      name: "Serial Number",
      selector: (row) => row.section,
    },
    {
      name: "Status",
      selector: (row) => row.asset_code,
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
    if (isSc === true) {
      getSlipList();
    }
  }, [isSc, getSlipList]);

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
              <h1 className="m-0">Service Call List</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Service Call List</li>
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
          <ScRPdf code={generatedQR} item={item} close={closePdfForm} />
        </section>
      ) : (
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
                          <th>Customer Name</th>
                          <th>Contact Number</th>
                          <th>Serial Number</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {itemArr.map((item) => {
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

export default ServiceCallList;
