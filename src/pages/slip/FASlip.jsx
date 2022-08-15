import React, { useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { SlipContext } from "../../context/slip-provider";
import RedirectError from "../../routes/RedirectError";

const FASlip = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const redirectError = RedirectError();
  const { setIsFa, setIsSlipCount } = useContext(SlipContext);

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
      const res = await axios.post("/api/create/wsfa", data, config);

      if (res.data.success === true) {
        setIsFa(true);
        setIsSlipCount(true);

        Swal.fire(
          "Great!",
          "Withdrawal slip successfully created.",
          "success"
        ).then(() => navigate("/fa-logs"));
      }
    } catch (err) {
      switch (err.code) {
        case "ERR_BAD_REQUEST":
          // return console.log(err.code, "ERR_BAD_REQUEST");
          return redirectError();

        default:
          return console.log(err, "ERROR");
      }
    }
  };

  const handleCancel = () => {
    navigate("/fa-logs");
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Fixed Asset Item Withdrawal Slip</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">
                  Fixed Asset Item Withdrawal Slip
                </li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
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
                            {...register("department", {
                              required: "Department is required",
                            })}
                            type="text"
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
                      <div className="col-6">
                        <div className="form-floating mb-3">
                          <input
                            name="mr_no"
                            {...register("mr_no", {
                              required: "MR is required",
                            })}
                            type="number"
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
                                <p>Item Code is required</p>
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
                                <p>Item Description is required</p>
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
                                autoComplete="off"
                                style={{
                                  border: errors?.items?.[index]?.qty
                                    ? "1px solid red"
                                    : "",
                                }}
                              />
                              {errors?.items?.[index]?.qty && (
                                <p>Qty is required</p>
                              )}
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register(`items.${index}.serial_no`, {
                                  required: true,
                                })}
                                type="text"
                                placeholder="Serial Number "
                                className="form-control"
                                autoComplete="off"
                                style={{
                                  border: errors?.items?.[index]?.serial_no
                                    ? "1px solid red"
                                    : "",
                                }}
                              />
                              {errors?.items?.[index]?.serial_no && (
                                <p>Serial is required</p>
                              )}
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                {...register(`items.${index}.remarks`, {
                                  required: true,
                                })}
                                placeholder="Remarks"
                                className="form-control"
                                autoComplete="off"
                                style={{
                                  border: errors?.items?.[index]?.remarks
                                    ? "1px solid red"
                                    : "",
                                }}
                              />
                              {errors?.items?.[index]?.remarks && (
                                <p>Remarks is required</p>
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
                  {/**card-body */}
                </form>
              </div>
              {/* card */}
            </div>
          </div>
        </div>
      </section>

      {/* /.content */}
    </div>
  );
};

export default FASlip;
