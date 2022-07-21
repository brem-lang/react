import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

import { useSelector, useDispatch } from "react-redux";
import { miListData } from "../../features/slip-list/slipListSlice";

const DMSlip = () => {
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
      const res = await axios.post("/api/create/wsdm", data, config);

      if (res.data.success === true) {
        dispatch(miListData({ ...slipList, dmState: true }));
        Swal.fire("Slip Add", "DM slip add", "success").then(() =>
          navigate("/dm-logs")
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">DM Slip</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">DM Slip</li>
              </ol>
            </div>
            {/* /.col */}
          </div>

          {/*  */}

          <section className="content">
            <div className="container-fluid">
              {/*  */}
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
                                {...register("purpose", {
                                  required: "Purpose is required",
                                })}
                                className="form-control"
                                placeholder="Purpose"
                                autoComplete="off"
                                style={{
                                  border: errors.purpose ? "1px solid red" : "",
                                }}
                              />
                              <p>{errors.purpose?.message}</p>
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-floating mb-3">
                              <input
                                {...register("customer_name", {
                                  required: "Customer Name is required",
                                })}
                                type="text"
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
                        </div>

                        {/*  */}
                        {/*  */}

                        <div className="row">
                          <div className="col"></div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DMSlip;
