import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
// import moment from "moment";
import Edit from "../../components/EditForm/Edit";
import { SlipContext } from "../../context/slip-provider";

import Spinner from "../../components/spinner/spinner.component";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import RedirectError from "../../routes/RedirectError";

function ListUsers() {
  const [isLoading, setIsLoading] = useState(false);
  // const [filteredData, setFilteredData] = useState([]);
  const { auth } = useAuth();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [item, setItem] = useState([]);
  const { edit, setEdit, isEdit, setIsEdit } = useContext(SlipContext);
  const redirectError = RedirectError();

  const itemArr = edit;

  const getData = useCallback(async () => {
    if (isEdit === false) return;
    const config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };

    setIsLoading(true);
    try {
      const res = await axios("api/manage/users", config);
      // setFilteredData(res.data.data);
      setEdit(res.data.data);
      setIsEdit(false);
    } catch (err) {
      switch (err.code) {
        case "ERR_BAD_REQUEST":
        // return redirectError();

        default:
          return console.log(err, "default");
      }
    }

    setIsLoading(false);
  }, [
    auth,
    setIsLoading,
    isEdit,
    setIsEdit,
    setEdit,
    redirectError,
    // setRefresh,
  ]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Roles",
      selector: (row) => row.roles.map((role) => role.name),
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          type="button"
          className="btn btn-outline-warning"
          onClick={(e) => handleEdit(e, row)}
        >
          <i className="fas fa-pen info"></i>
        </button>
      ),
    },
  ];

  const handleEdit = (e, item) => {
    e.preventDefault();
    setItem(item);
    setIsOpenEdit(true);
    // console.log(item)
  };

  const closeEditForm = (e) => {
    setIsOpenEdit(false);
    setItem([]);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (edit) {
      getData();
    }
  }, [edit, getData]);

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">List of Users</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">List of Users</li>
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
      ) : isOpenEdit ? (
        <section className="content">
          <Edit item={item} close={closeEditForm} />
        </section>
      ) : (
        <section className="content">
          <div className="container-fluid">
            <div className="py-12">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="card">
                  <div className="card-header">
                    <div className="card-tools">
                      <Link to="/add-user" className="btn btn-success">
                        Add User
                      </Link>
                    </div>
                  </div>
                  <div className="card-body">
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <DataTable
                        columns={columns}
                        data={itemArr}
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
      )}
    </div>
  );
}
export default ListUsers;
