import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import moment from "moment";

import Spinner from "../../components/spinner/spinner.component";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

function Logs() {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const { auth } = useAuth();

  const getData = useCallback(async () => {
    const config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };

    setIsLoading(true);
    try {
      const res = await axios("api/get/log", config);
      setFilteredData(res.data.data);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  }, [auth, setIsLoading]);

  useEffect(() => {
    getData();
  }, [getData]);

  const columns = [
    {
      name: "Date/Time",
      selector: (row) => moment(row.created_at).format("lll"),
    },
    {
      name: "Event",
      selector: (row) => row.event,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Document Series Number",
      selector: (row) => row.properties["Document Series Number"],
    },
  ];

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Activity Logs</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Activity Logs</li>
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
                <div className="card-body">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <DataTable
                      columns={columns}
                      data={filteredData}
                      pagination
                      selectableRowsHighlight
                      highlightOnHover
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Logs;
