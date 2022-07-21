import axios from "axios";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function FGReturnSlip() {
  const { auth } = useAuth();
  const navigate = useNavigate();

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
    console.log(JSON.stringify(data));
    let config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
    try {
      const res = await axios.post(
        "http://172.16.0.118/api/create/returnslip",
        data,
        config
      );
      if (res.data.success === true) {
        Swal.fire("Slip Add", "FG Return slip add", "success").then(() =>
          navigate("/fg-return-logs")
        );
      }
      console.log(res);
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
              <h1 className="m-0">FG Return Slip</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">FG Return Slip</li>
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
                            value={"fg"}
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
                            class="btn btn-success"
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
                                class="btn btn-danger"
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
}

export default FGReturnSlip;
