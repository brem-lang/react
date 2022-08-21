import React from "react";
import Logo from "../../assets/images/gfi.jpg";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import Swal from "sweetalert2";
import RedirectError from "../../routes/RedirectError";
import useAuth from "../../hooks/useAuth";
const initialValue = {
  name: "",
};
function HandoverForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [dataField, setDataField] = useState(initialValue);
  const navigate = useNavigate();
  const redirectError = RedirectError();
  const location = useLocation();
  const department = location.state.status;
  console.log(department);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setDataField({ ...dataField, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccess(true);
    if (location.state === null) {
      navigate("/");
    }
    const formData = new FormData();
    formData.append("document_series_no", location.state.document_series_no);
    formData.append("name", dataField.name);

    // try {
    //   const res = await axios.post("/api/handover", formData);
    //   if (res.data.success === true) {
    //     setIsSuccess(true);
    //   }
    // } catch (err) {
    //   switch (err.code) {
    //     case "ERR_BAD_REQUEST":
    //       // return redirectError();
    //       console.log(err);
    //     default:
    //       return console.log(err, "default");
    //   }
    // }
  };

  const close = (e) => {
    navigate(-2);
  };

  return (
    <div
      className="hold-transition login-page"
      style={{ backgroundColor: "white" }}
    >
      <div className="login-box">
        <div className="login-logo">
          <img src={Logo} alt="AdminLTE Logo" width="400" height="120" />
        </div>
        {/* /.login-logo */}
        {isSuccess ? (
          <>
            <h1 style={{ fontSize: 50, textAlign: "center" }}>Success!!</h1>
            <button
              onClick={() => close()}
              style={{ marginLeft: 150, fontSize: 15 }}
              type="button"
              className="btn btn-outline-info"
            >
              Close
            </button>
          </>
        ) : (
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Handover Form</p>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={dataField.name}
                    onChange={(e) => onChangeHandler(e)}
                    autoComplete="off"
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user"></span>
                    </div>
                  </div>
                </div>

                <div className="input-group mb-3">
                  <select className="form-control">
                    {department.map((data) => (
                      <option value={data.department}>{data.department}</option>
                    ))}
                  </select>

                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-building"></span>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <button type="submit" class="btn btn-success btn-block">
                      Submit
                    </button>
                  </div>
                  <div class="col-6">
                    <button
                      onClick={() => close()}
                      class="btn btn-primary btn-block"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* /.login-card-body */}
          </div>
        )}
      </div>
    </div>
  );
}

export default HandoverForm;
