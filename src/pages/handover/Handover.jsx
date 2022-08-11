import React from "react";
import Logo from "../../assets/images/gfi.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Swal from "sweetalert2";
import RedirectError from "../../routes/RedirectError";
import useAuth from "../../hooks/useAuth";
const initialValue = {
  name: "",
};
function Handover() {
  const [dataField, setDataField] = useState(initialValue);
  const navigate = useNavigate();
  const redirectError = RedirectError();
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setDataField({ ...dataField, [name]: value });
  };
  const { auth } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    let config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };

    const formData = new FormData();
    console.log(dataField.name);
    formData.append("name", dataField.name);
    // try {
    //   const res = await axios.post(
    //     "api/manage/department/store",
    //     formData,
    //     config
    //   );
    //   if (res.data.success === true) {
    //     Swal.fire(
    //       "Great!",
    //       "The user was successfully created.",
    //       "success"
    //     ).then(() => {
    //       setRefresh(true);
    //       navigate("/department");
    //     });
    //   }
    // } catch (err) {
    //   switch (err.code) {
    //     case "ERR_BAD_REQUEST":
    //       return redirectError();

    //     default:
    //       return console.log(err, "default");
    //   }
    // }
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
        <div className="card">
          <div className="card-body login-card-body">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Department"
                  name="name"
                  value={dataField.name}
                  onChange={(e) => onChangeHandler(e)}
                  autoComplete="off"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-building"></span>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <button type="submit" class="btn btn-primary btn-block">
                    Request new password
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
    </div>
  );
}

export default Handover;
