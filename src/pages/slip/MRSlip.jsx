import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

import { useSelector, useDispatch } from "react-redux";
import { miListData } from "../../features/slip-list/slipListSlice";

const MRSlip = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const slipList = useSelector((state) => state.slipList.value);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // Submit using axios
  const onSubmit = async (data) => {
    // console.log(JSON.stringify(data))
    let config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };

    try {
      const res = await axios.post("/api/create/memorandum", data, config);

      if (res.data.success === true) {
        dispatch(miListData({ ...slipList, mrState: true }));
        Swal.fire("Slip Add", "MR slip add", "success").then(() =>
          navigate("/mr-logs")
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">MR Slip</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">MR Slip</li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="card">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* @csrf                               */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="number"
                            {...register("id_no", {
                              required: "ID Number is required",
                            })}
                            className="form-control"
                            placeholder="ID number"
                            autoComplete="off"
                            style={{
                              border: errors.id_no ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.id_no?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("name_of_employee", {
                              required: "Name of Employee is required",
                            })}
                            className="form-control"
                            placeholder="Name of Employee"
                            autoComplete="off"
                            style={{
                              border: errors.name_of_employee
                                ? "1px solid red"
                                : "",
                            }}
                          />
                          <p>{errors.name_of_employee?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("department", {
                              required: "Department is required",
                            })}
                            className="form-control"
                            placeholder="Department"
                            autoComplete="off"
                            style={{
                              border: errors.department ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.department?.message}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("section", {
                              required: "Section is required",
                            })}
                            className="form-control"
                            placeholder="Section"
                            autoComplete="off"
                            style={{
                              border: errors.section ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.section?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("asset_code", {
                              required: "Asset Code is required",
                            })}
                            className="form-control"
                            placeholder="Asset Code"
                            autoComplete="off"
                            style={{
                              border: errors.asset_code ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.asset_code?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("asset_type", {
                              required: "Asset Type is required",
                            })}
                            className="form-control"
                            placeholder="Asset Type"
                            autoComplete="off"
                            style={{
                              border: errors.asset_type ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.asset_type?.message}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("asset_description", {
                              required: "Asset Description is required",
                            })}
                            className="form-control"
                            placeholder="Asset Description"
                            autoComplete="off"
                            style={{
                              border: errors.asset_description
                                ? "1px solid red"
                                : "",
                            }}
                          />
                          <p>{errors.asset_description?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("asset_serial_no", {
                              required: "Asset Number is required",
                            })}
                            className="form-control"
                            placeholder="Asset Serial Number"
                            autoComplete="off"
                            style={{
                              border: errors.asset_serial_no
                                ? "1px solid red"
                                : "",
                            }}
                          />
                          <p>{errors.asset_serial_no?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("asset_value", {
                              required: "Asset Value is required",
                            })}
                            className="form-control"
                            placeholder="Asset Value  "
                            autoComplete="off"
                            style={{
                              border: errors.asset_value ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.asset_value?.message}</p>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /.content */}
    </div>
  );
};

export default MRSlip;
