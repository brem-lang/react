import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import { useNavigate, createSearchParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
const MIView = ({ item, close }) => {
  const navigate = useNavigate();
  const [approval, setApproval] = useState([]);
  const { auth } = useAuth();
  const {
    id,
    created_time,
    approved_by,
    customer_name,
    author,
    items,
    pallet_no,
    prepared_by,
    profit_center,
    released_by,
    sub_profit_center,
    warehouse,
    wh_location,
    created_at,
    document_series_no,
    checked_by,
    noted_by,
  } = item;
  const date = moment(created_at).format("ll");
  const mystyle = {
    overflowY: "scroll",
    float: "left",
    height: "375px",
  };

  const columns = [
    {
      name: "Item Code",
      selector: (row) => row.item_code,
    },
    {
      name: "Item Description",
      selector: (row) => row.item_description,
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
    },
    {
      name: "Uom",
      selector: (row) => row.uom,
    },
    {
      name: "Remarks",
      selector: (row) => row.remarks,
    },
  ];

  const getData = useCallback(async () => {
    const config = {
      params: { document_series_no: document_series_no },
      headers: { Authorization: `Bearer ${auth.token}` },
    };

    try {
      const res = await axios("/api/formDepartments", config);
      setApproval(res.data.data);
    } catch (err) {
      console.log(err);
      switch (err.code) {
        case "ERR_BAD_REQUEST":
          // return redirectError();
          console.log(err);

        default:
          return console.log(err, "default");
      }
    }
  }, [auth]);

  useEffect(() => {
    getData();
  }, [getData]);

  const addDept = () => {
    navigate("/add-approval", {
      state: {
        id: id,
        document_series_no: document_series_no,
      },
    });
  };
  return (
    <>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <button
                onClick={() => close(false)}
                style={{ float: "right", fontSize: 15 }}
                type="button"
                className="btn btn-outline-info"
              >
                Close
              </button>
              {approval.length ? null : (
                <button
                  onClick={addDept}
                  style={{ float: "right", fontSize: 15, marginRight: 10 }}
                  type="button"
                  className="btn btn-success"
                >
                  Add Department
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* left column */}
            <div className="col-md-6">
              {/* general form elements */}
              <div className="card card-success">
                <div className="card-header">
                  <h3 className="card-title">DETAILS</h3>
                </div>
                {/* body */}
                <div className="card-body" style={mystyle}>
                  <dl class="row">
                    <dt class="col-sm-6">Document Series Number</dt>
                    <dd class="col-sm-6">{document_series_no}</dd>
                    <dt class="col-sm-6">Created by</dt>
                    <dd class="col-sm-6">{author}</dd>
                    <dt class="col-sm-6">Date Created</dt>
                    <dd class="col-sm-6">{date}</dd>
                    <dt class="col-sm-6">Time</dt>
                    <dd class="col-sm-6">{created_time}</dd>
                    <dt class="col-sm-6">Customer Name</dt>
                    <dd class="col-sm-6">{customer_name}</dd>
                    <dt class="col-sm-6">Pallet No.</dt>
                    <dd class="col-sm-6">{pallet_no}</dd>
                    <dt class="col-sm-6">Profit Center</dt>
                    <dd class="col-sm-6">{profit_center}</dd>
                    <dt class="col-sm-6">Sub Profit Center</dt>
                    <dd class="col-sm-6">{sub_profit_center}</dd>
                    <dt class="col-sm-6">Warehouse</dt>
                    <dd class="col-sm-6">{warehouse}</dd>
                    <dt class="col-sm-6">Warehouse Location</dt>
                    <dd class="col-sm-6">{wh_location}</dd>
                    <dt class="col-sm-6">Prepared by</dt>
                    <dd class="col-sm-6">{prepared_by}</dd>
                    <dt class="col-sm-6">Approved by</dt>
                    <dd class="col-sm-6">{approved_by}</dd>
                    <dt class="col-sm-6">Released by</dt>
                    <dd class="col-sm-6">{released_by}</dd>
                    <dt class="col-sm-6">Checked by</dt>
                    <dd class="col-sm-6">{checked_by}</dd>
                    <dt class="col-sm-6">Noted by</dt>
                    <dd class="col-sm-6">{noted_by}</dd>
                  </dl>
                </div>
              </div>
            </div>
            {/*/.col (left) */}
            {/* right column */}
            <div className="col-md-6">
              {/* Form Element sizes */}
              <div className="card card-success">
                <div className="card-header">
                  <h3 className="card-title">APPROVAL DEPARTMENT</h3>
                </div>
                <div className="card-body" style={mystyle}>
                  <ul>
                    {approval.length ? (
                      approval.map((data) => (
                        <li>
                          <dt>{data.department}</dt>
                          {/* <p style={{ fontSize: 10 }}>Aug 05, 2022 - 03:00 PM</p> */}
                        </li>
                      ))
                    ) : (
                      <p style={{ fontSize: 10 }}>No Approval Department</p>
                    )}
                  </ul>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/*/.col (right) */}
          </div>
          {/* /.row */}
        </div>
        <div className="container-fluid">
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="card card-success">
                <div className="card-header">
                  <h3 className="card-title">ITEMS</h3>
                </div>
                <div className="card-body">
                  <DataTable
                    columns={columns}
                    data={items}
                    pagination
                    fixedHeader
                    selectableRowsHighlight
                    highlightOnHover
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
    </>
  );
};

export default MIView;
