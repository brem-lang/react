import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { SlipContext } from "../../context/slip-provider";
import RedirectError from "../../routes/RedirectError";

const MRSlip = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const redirectError = RedirectError();
  const { setIsMr, setIsSlipCount } = useContext(SlipContext);

  const {
    register,
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
        setIsMr(true);
        setIsSlipCount(true);

        Swal.fire("Great!", "Memorandum successfully created.", "success").then(
          () => navigate("/mr-logs")
        );
      }
    } catch (err) {
      console.log(err.response);
      // switch (err.code) {
      //   case "ERR_BAD_REQUEST":
      //     // return console.log(err.code, "ERR_BAD_REQUEST");
      //     return redirectError();

      //   default:
      //     return console.log(err, "ERROR");
      // }
    }
  };

  const handleCancel = () => {
    navigate("/mr-logs");
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Memorandum Slip</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Memorandum Slip</li>
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
                    <div className="row">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("noted_by", {
                              required: "Noted by is required",
                            })}
                            className="form-control"
                            placeholder="Noted by"
                            autoComplete="off"
                            style={{
                              border: errors.noted_by ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.noted_by?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("prepared_by", {
                              required: "Prepared by is required",
                            })}
                            className="form-control"
                            placeholder="Prepared by"
                            autoComplete="off"
                            style={{
                              border: errors.prepared_by ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.prepared_by?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("approved_by", {
                              required: "Approved by is required",
                            })}
                            className="form-control"
                            placeholder="Approved by"
                            autoComplete="off"
                            style={{
                              border: errors.approved_by ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.approved_by?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("checked_by", {
                              required: "Checked by is required",
                            })}
                            className="form-control"
                            placeholder="Checked by"
                            autoComplete="off"
                            style={{
                              border: errors.checked_by ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.checked_by?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("released_by", {
                              required: "Released by is required",
                            })}
                            className="form-control"
                            placeholder="Released by"
                            autoComplete="off"
                            style={{
                              border: errors.released_by ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.released_by?.message}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn bg-gradient-warning"
                      style={{ marginRight: 10 }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn bg-gradient-success">
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
