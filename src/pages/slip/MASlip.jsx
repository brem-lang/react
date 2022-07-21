import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

import { useSelector, useDispatch } from "react-redux";
import { miListData } from "../../features/slip-list/slipListSlice";
import { Link } from "react-router-dom";

const MASlip = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const slipList = useSelector((state) => state.slipList.value);

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
    // console.log(JSON.stringify(data))
    let config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };

    try {
      const res = await axios.post("/api/create/wsma", data, config);

      if (res.data.success === true) {
        dispatch(miListData({ ...slipList, maState: true }));
        Swal.fire("Slip Add", "MA slip add", "success").then(() =>
          navigate("/ma-logs")
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
              <h1 className="m-0">MA Slip</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">MA Slip</li>
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
                            {...register("released_by", {
                              required: "Release by is required",
                            })}
                            type="text"
                            placeholder="Release by"
                            className="form-control"
                            autoComplete="off"
                            style={{
                              border: errors.released_by ? "1px solid red" : "",
                            }}
                          />
                          <p>{errors.released_by?.message}</p>
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

export default MASlip;
