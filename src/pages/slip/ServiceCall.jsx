import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { SlipContext } from "../../context/slip-provider";

export default function ServiceCall() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { setIsSc, setIsSlipCount } = useContext(SlipContext);

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
      const res = await axios.post("/api/create/servicecall", data, config);

      if (res.data.success === true) {
        setIsSc(true);
        setIsSlipCount(true);

        Swal.fire("Great", "Service Call successfully add", "success").then(
          () => navigate("/servicecall-logs")
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
              <h1 className="m-0">Service Call</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Service Call</li>
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

      {/* /.content */}

      <section className="content">
        <div className="container-fluid">
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="card">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("customer_name", {
                              required: "Customer Name is required",
                            })}
                            className="form-control"
                            placeholder="Customer Name"
                            autoComplete="off"
                            style={{
                              border: errors.customer_name
                                ? "1px solid red"
                                : "",
                            }}
                          />
                          <p>{errors.customer_name?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="number"
                            {...register("contact_number", {
                              required: "Contact Number is required",
                            })}
                            className="form-control"
                            placeholder="Contact Number"
                            autoComplete="off"
                            style={{
                              border: errors.contact_number
                                ? "1px solid red"
                                : "",
                            }}
                          />
                          <p>{errors.contact_number?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="number"
                            {...register("phone_no", {
                              required: "Phone Number is required",
                            })}
                            className="form-control"
                            placeholder="Phone number"
                            autoComplete="off"
                            style={{
                              border: errors.phone_no ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.phone_no?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("status", {
                              required: "Status is required",
                            })}
                            className="form-control"
                            placeholder="Status"
                            autoComplete="off"
                            style={{
                              border: errors.status ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.status?.message}</p>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    <div className="row">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("item_no", {
                              required: "Item Number is required",
                            })}
                            className="form-control"
                            placeholder="Item number"
                            autoComplete="off"
                            style={{
                              border: errors.item_no ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.item_no?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("description", {
                              required: "Description is required",
                            })}
                            className="form-control"
                            placeholder="Description"
                            autoComplete="off"
                            style={{
                              border: errors.description ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.description?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("mfr_serial_no", {
                              required: "MFR Serial Number is required",
                            })}
                            className="form-control"
                            placeholder="Mfr Serial number"
                            autoComplete="off"
                            style={{
                              border: errors.mfr_serial_no
                                ? "1px solid red"
                                : "",
                            }}
                          />
                          <p>{errors.mfr_serial_no?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("serial_no", {
                              required: "Serial Number is required",
                            })}
                            className="form-control"
                            placeholder="Serial number"
                            autoComplete="off"
                            style={{
                              border: errors.serial_no ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.serial_no?.message}</p>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    <div className="row">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("subject", {
                              required: "Subject is required",
                            })}
                            className="form-control"
                            placeholder="Subject"
                            autoComplete="off"
                            style={{
                              border: errors.subject ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.subject?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("origin", {
                              required: "Origin is required",
                            })}
                            className="form-control"
                            placeholder="Origin"
                            autoComplete="off"
                            style={{
                              border: errors.origin ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.origin?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("problem_type", {
                              required: "Problem Type is required",
                            })}
                            className="form-control"
                            placeholder="Problem Type"
                            autoComplete="off"
                            style={{
                              border: errors.problem_type
                                ? "1px solid red"
                                : "",
                            }}
                          />
                          <p>{errors.problem_type?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("assigned_to", {
                              required: "Assigned to is required",
                            })}
                            className="form-control"
                            placeholder="Assigned to"
                            autoComplete="off"
                            style={{
                              border: errors.assigned_to ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.assigned_to?.message}</p>
                        </div>
                      </div>
                    </div>
                    {/*  */}

                    <div className="row">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("priority", {
                              required: "Priority is required",
                            })}
                            className="form-control"
                            placeholder="Priority"
                            autoComplete="off"
                            style={{
                              border: errors.priority ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.priority?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("call_type", {
                              required: "Call Type is required",
                            })}
                            className="form-control"
                            placeholder="Call type"
                            autoComplete="off"
                            style={{
                              border: errors.call_type ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.call_type?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("technician", {
                              required: "Technician is required",
                            })}
                            className="form-control"
                            placeholder="Technician"
                            autoComplete="off"
                            style={{
                              border: errors.technician ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.technician?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("remarks", {
                              required: "Remarks is required",
                            })}
                            className="form-control"
                            placeholder="Remarks"
                            autoComplete="off"
                            style={{
                              border: errors.remarks ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.remarks?.message}</p>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                  {/* card-body */}
                </form>
              </div>
              {/* card */}
            </div>
          </div>
        </div>
        {/* container-fluid */}
      </section>
    </div>
  );
}
