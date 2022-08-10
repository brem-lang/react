import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import Spinner from "../../components/spinner/spinner.component";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import RedirectError from "../../routes/RedirectError";

function Department() {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isSync, setIsSync] = useState(true);
  const [search, setSearch] = useState([]);
  const redirectError = RedirectError();
  const { auth, refresh, setRefresh } = useAuth();
  const navigate = useNavigate();

  const getData = useCallback(async () => {
    const config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };

    setIsLoading(true);
    try {
      const res = await axios("api/manage/department", config);
      setFilteredData(res.data.data);
      setRefresh(false);
    } catch (err) {
      console.log(err);
      switch (err.code) {
        case "ERR_BAD_REQUEST":
          return redirectError();

        default:
          return console.log(err, "default");
      }
    }
    setIsLoading(false);
    setIsSync(false);
  }, [auth, setIsLoading, redirectError]);

  useEffect(() => {
    if (isSync === true) {
      getData();
    }
  }, [isSync, getData]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          type="button"
          className="btn btn-outline-warning"
          onClick={(e) => handleDelete(e, row)}
        >
          <i className="fa fa-trash warning"></i>
        </button>
      ),
    },
  ];

  const handleDelete = (e, row) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const config = {
          params: { id: row.id },
          headers: { Authorization: `Bearer ${auth.token}` },
        };
        try {
          const res = await axios.get("/api/manage/department/delete", config);
          console.log(res.data);
          if (res.data.success === true) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setRefresh(true);
          }
        } catch (err) {
          switch (err.code) {
            case "ERR_BAD_REQUEST":
              return redirectError();
            default:
              return console.log(err, "default");
          }
        }
      }
    });
  };

  useEffect(() => {
    if (refresh === true) {
      getData();
    }
  }, [refresh, getData]);

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Department</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Department</li>
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
                  <h3 className="card-title">Activity Logs</h3>
                  <div className="card-tools">
                    <Link to="/add-department" className="btn btn-success">
                      Add Department
                    </Link>
                  </div>
                </div>

                <div className="card-body">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <DataTable
                      columns={columns}
                      data={filteredData}
                      pagination
                      fixedHeader
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

export default Department;
