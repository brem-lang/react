import React, { useCallback, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import RedirectError from "../../routes/RedirectError";
import Swal from "sweetalert2";

function AddApproval() {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const { state } = useLocation();
  const { auth } = useAuth();
  const [isSync, setIsSync] = useState(true);
  const redirectError = RedirectError();
  const navigate = useNavigate();

  const getData = useCallback(async () => {
    const config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };

    setIsLoading(true);
    try {
      const res = await axios("api/manage/departments", config);
      setFilteredData(res.data.data);
    } catch (err) {
      console.log(err.response);
      // switch (err.code) {
      //   case "ERR_BAD_REQUEST":
      //     return redirectError();

      //   default:
      //     return console.log(err, "default");
      // }
    }
    setIsLoading(false);
    setIsSync(false);
  }, [auth, setIsLoading, redirectError]);

  useEffect(() => {
    if (isSync === true) {
      getData();
    }
  }, [isSync, getData]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      department: [{ department: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "department",
  });

  const onSubmit = async (data) => {
    let config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
        // data: data,
      },
    };

    try {
      const res = await axios.post(
        "/api/approval/departments/create?form=wsmi",
        data,
        config
      );

      if (res.data.success === true) {
        Swal.fire(
          "Great!",
          "Approval Department Successfuly Added",
          "success"
        ).then(() => navigate("/mi-logs"));
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
  const close = () => {
    navigate("/mi-logs");
  };
  if (state === null) {
    navigate("/");
    console.log("empty");
  }
  return (
    <body className="hold-transition register-page">
      <div className="register-box">
        <div className="card card-success">
          <div className="card-header">
            <button
              onClick={() => close()}
              style={{ float: "right", fontSize: 15 }}
              type="button"
              className="btn btn-warning"
            >
              Close
            </button>
            <h3 className="card-title">DEPARTMENT</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col text-right">
                  <div className="form-floating mb-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        append({
                          department: "",
                        });
                      }}
                      className="btn btn-success"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <input
                {...register("document_series_no", {
                  required: "Customer Name is required",
                })}
                type="text"
                className="form-control"
                autoComplete="off"
                hidden
                value={state.document_series_no}
              />

              {fields.map((department, index) => {
                return (
                  <div className="row" key={department.id}>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input
                          {...register(`department.${index}.wsmi_id`, {
                            required: true,
                          })}
                          type="text"
                          className="form-control"
                          value={state.id}
                          autoComplete="off"
                          hidden
                        />
                        <input
                          {...register(
                            `department.${index}.wsmi_document_series_no`,
                            {
                              required: true,
                            }
                          )}
                          type="text"
                          className="form-control"
                          value={state.document_series_no}
                          autoComplete="off"
                          hidden
                        />
                        <div className="input-group mb-3">
                          <select
                            className="form-control"
                            {...register(`department.${index}.department`, {
                              required: true,
                            })}
                            style={{
                              border: errors?.department?.[index]?.department
                                ? "1px solid red"
                                : "",
                            }}
                          >
                            {filteredData.map((data) => (
                              <option value={data.name}>{data.name}</option>
                            ))}
                          </select>

                          <div className="input-group-append">
                            <div className="input-group-text">
                              <span className="fas fa-building"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-auto">
                      <div className="form-floating ">
                        <button
                          onClick={() => remove(index)}
                          className="btn btn-danger"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="row">
                <div className="col-8"></div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* /.card-body */}
        </div>
      </div>
    </body>
  );
}

export default AddApproval;
