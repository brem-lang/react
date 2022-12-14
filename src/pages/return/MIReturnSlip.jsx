import React, { useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { SlipContext } from "../../context/slip-provider";
import RedirectError from "../../routes/RedirectError";

const MISlip = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const redirectError = RedirectError();
  const { setIsMiR, setIsSlipCount } = useContext(SlipContext);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      items: [
        { item_code: "", item_description: "", qty: "", uom: "", remarks: "" },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // Submit using axios
  const onSubmit = async (data) => {
    let config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
    try {
      const res = await axios.post("/api/create/returnslip", data, config);
      if (res.data.success === true) {
        setIsMiR(true);
        setIsSlipCount(true);

        Swal.fire("Great", "Return slip successfully created.", "success").then(
          () => navigate("/mi-return-logs")
        );
      }
    } catch (err) {
      switch (err.response.status) {
        case 404:
          return Swal.fire({
            icon: "error",
            title: "Not found",
            text: "Something went wrong!",
          });

        default:
          return console.log(err, "ERROR");
      }
    }
  };

  const handleCancel = () => {
    navigate("/mi-return-logs");
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Merchandise Return Slip</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">
                  Merchandise Return Slip
                </li>
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
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="hidden"
                            {...register("withdrawal_form")}
                            value={"mi"}
                          />
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
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("mr_no", {
                              required: "MR Number is required",
                            })}
                            className="form-control"
                            placeholder="MR Number"
                            autoComplete="off"
                            style={{
                              border: errors.mr_no ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.mr_no?.message}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("withdrawal_slip_no", {
                              required: "Withdrawal Slip Number is required",
                            })}
                            className="form-control"
                            placeholder="Withdrawal Slip Number"
                            autoComplete="off"
                            style={{
                              border: errors.withdrawal_slip_no
                                ? "1px solid red"
                                : "",
                            }}
                          />
                          <p>{errors.withdrawal_slip_no?.message}</p>
                        </div>
                      </div>
                    </div>
                    {/*Dynamic Fields Begin*/}
                    <div className="row">
                      <div className="col text-right">
                        <div className="form-floating mb-3">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              append({
                                item_code: "",
                                item_description: "",
                                qty: "",
                                uom: "",
                                remarks: "",
                              });
                            }}
                            className="btn btn-success"
                          >
                            Add Fields..
                          </button>
                        </div>
                      </div>
                    </div>
                    {fields.map((items, index) => {
                      return (
                        <div className="row" key={items.id}>
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register(`items.${index}.item_code`, {
                                  required: true,
                                })}
                                type="text"
                                placeholder="Item Code"
                                className="form-control"
                                autoComplete="off"
                                style={{
                                  border: errors?.items?.[index]?.item_code
                                    ? "1px solid red"
                                    : "",
                                }}
                              />
                              {errors?.items?.[index]?.item_code && (
                                <p>Item Code is Required</p>
                              )}
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register(
                                  `items.${index}.item_description`,
                                  { required: true }
                                )}
                                type="text"
                                placeholder="Item Description"
                                className="form-control"
                                autoComplete="off"
                                style={{
                                  border: errors?.items?.[index]
                                    ?.item_description
                                    ? "1px solid red"
                                    : "",
                                }}
                              />
                              {errors?.items?.[index]?.item_description && (
                                <p>Item Description is Required</p>
                              )}
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register(`items.${index}.qty`, {
                                  required: true,
                                })}
                                type="number"
                                placeholder="Qty"
                                className="form-control"
                                step="any"
                                autoComplete="off"
                                style={{
                                  border: errors?.items?.[index]?.qty
                                    ? "1px solid red"
                                    : "",
                                }}
                              />
                              {errors?.items?.[index]?.qty && (
                                <p>QTY is Required</p>
                              )}
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register(`items.${index}.uom`, {
                                  required: true,
                                })}
                                type="text"
                                placeholder="UOM "
                                className="form-control"
                                autoComplete="off"
                                style={{
                                  border: errors?.items?.[index]?.uom
                                    ? "1px solid red"
                                    : "",
                                }}
                              />
                              {errors?.items?.[index]?.uom && (
                                <p>UOM is Required</p>
                              )}
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                {...register(`items.${index}.reason`, {
                                  required: true,
                                })}
                                placeholder="Reason"
                                className="form-control"
                                autoComplete="off"
                                style={{
                                  border: errors?.items?.[index]?.reason
                                    ? "1px solid red"
                                    : "",
                                }}
                              />
                              {errors?.items?.[index]?.reason && (
                                <p>Remarks is Required</p>
                              )}
                            </div>
                          </div>
                          <div className="col-md-auto">
                            <div className="form-floating ">
                              <button
                                onClick={() => remove(index)}
                                className="btn btn-danger"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/*Dynamic Fields End*/}

                    <div className="row">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("prepared_by", {
                              required: "Prepared by is required",
                            })}
                            placeholder="Prepared by"
                            className="form-control"
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
                            placeholder="Approved by"
                            className="form-control"
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
                            {...register("received_by", {
                              required: "Recieved by is required",
                            })}
                            type="text"
                            placeholder="Received by"
                            className="form-control"
                            autoComplete="off"
                            style={{
                              border: errors.received_by ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.received_by?.message}</p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            {...register("released_by", {
                              required: "Released by is required",
                            })}
                            type="text"
                            placeholder="Released by"
                            className="form-control"
                            autoComplete="off"
                            style={{
                              border: errors.released_by ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.released_by?.message}</p>
                        </div>
                      </div>

                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            {...register("checked_by", {
                              required: "Checked by is required",
                            })}
                            type="text"
                            placeholder="Checked by"
                            className="form-control"
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
                            {...register("noted_by", {
                              required: "Noted by is required",
                            })}
                            type="text"
                            placeholder="Noted by"
                            className="form-control"
                            autoComplete="off"
                            style={{
                              border: errors.noted_by ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.noted_by?.message}</p>
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

export default MISlip;
