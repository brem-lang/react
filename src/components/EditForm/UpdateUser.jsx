import React from "react";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Swal from "sweetalert2";

const initialValue = {
  pwd: "",
  confirmPwd: "",
};

function UpdateUser() {
  const [dataField, setDataField] = useState(initialValue);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setDataField({ ...dataField, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };

    const formData = new FormData();

    formData.append("password", dataField.pwd);

    if (dataField.pwd !== dataField.confirmPwd)
      return alert("Password do not match");

    try {
      const res = await axios.post(
        "/api/manage/profile/update",
        formData,
        config
      );
      if (res.data.success === true) {
        Swal.fire(
          "Great!",
          "It's a good idea to use a strong password that you're not using elsewhere",
          "success"
        ).then(() => navigate(-1));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(auth)
  return (
    <body className="hold-transition register-page">
      <div className="register-box">
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Update</p>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  autoComplete="off"
                  required
                  value={auth.user}
                  readOnly
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="pwd"
                  value={dataField.pwd}
                  onChange={(e) => onChangeHandler(e)}
                  autoComplete="off"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Retype password"
                  name="confirmPwd"
                  value={dataField.confirmPwd}
                  onChange={(e) => onChangeHandler(e)}
                  autoComplete="off"
                  required
                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-8"></div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
}

export default UpdateUser;
