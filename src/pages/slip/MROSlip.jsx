import React, { useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { SlipContext } from "../../context/slip-provider";
import RedirectError from "../../routes/RedirectError";

const MROSlip = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const redirectError = RedirectError();
  const { setIsMro, setIsSlipCount } = useContext(SlipContext);

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

  //
  const onSubmit = async (data) => {
    let config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };

    try {
      const res = await axios.post("/api/create/wsmro", data, config);

      if (res.data.success === true) {
        setIsMro(true);
        setIsSlipCount(true);

        Swal.fire(
          "Great!",
          "Withdrawal slip successfully created.",
          "success"
        ).then(() => navigate("/mro-logs"));
      }
    } catch (err) {
      console.log(err.response);
      // switch (err.code) {
      //   case "ERR_BAD_REQUEST":
      //     // return console.log(err.response, "ERR_BAD_REQUEST");
      //     return redirectError();

      //   default:
      //     return console.log(err, "ERROR");
      // }
    }
  };

  const handleCancel = () => {
    navigate("/mro-logs");
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">
                Maintence, Repairs, Operations Withdrawal Slip
              </h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">
                  Maintence, Repairs, Operations Withdrawal Slip
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
                  {/* @csrf                               */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("profit_center", {
                              required: "Profit Center is required",
                            })}
                            className="form-control"
                            placeholder="Profit Center"
                            autoComplete="off"
                            style={{
                              border: errors.profit_center
                                ? "1px solid red"
                                : "",
                            }}
                          />
                          <p>{errors.profit_center?.message}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("sub_profit_center", {
                              required: "Sub Profit Center is required",
                            })}
                            className="form-control"
                            placeholder="Sub-Profit Center"
                            autoComplete="off"
                            style={{
                              border: errors.sub_profit_center
                                ? "1px solid red"
                                : "",
                            }}
                          />
                          <p>{errors.sub_profit_center?.message}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            {...register("cost_center", {
                              required: "Cost Center is required",
                            })}
                            className="form-control"
                            placeholder="Cost Center"
                            autoComplete="off"
                            style={{
                              border: errors.cost_center ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.cost_center?.message}</p>
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

export default MROSlip;
