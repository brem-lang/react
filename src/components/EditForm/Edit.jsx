import React from "react";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Swal from "sweetalert2";

const Edit = ({ item, close }) => {
  //dynamic data from table
  const {
    // email,
    // name,
    roles,
  } = item;
  //save initial value
  const initialValue = {
    email: item.email,
    name: item.name,
    pwd: "",
    confirmPwd: "",
  };
  const { auth } = useAuth();
  const [dataField, setDataField] = useState(initialValue);
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
    formData.append("email", dataField.email);
    formData.append("password", dataField.pwd);

    if (dataField.pwd !== dataField.confirmPwd)
      return alert("Password do not match");

    try {
      const res = await axios.post("/api/manage/user/update", formData, config);
      if (res.data.success === true) {
        Swal.fire("Great!", "Password successfully updated.", "success").then(
          () => navigate(-1)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <body className="hold-transition register-page">
      <div className="register-box">
        <div className="card">
          <div className="card-body register-card-body">
            <button
              onClick={() => close(false)}
              style={{ float: "right", border: "none", fontSize: 15 }}
              type="button"
              className="btn btn-outline-info"
            >
              Close
            </button>
            <br></br>
            <br></br>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={dataField.email}
                  onChange={(e) => onChangeHandler(e)}
                  autoComplete="off"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-at"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="Name"
                  className="form-control"
                  placeholder="Email"
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
              <p>Roles</p>

              {roles.map((data) => (
                <div className="input-group mb-3" key={data.id}>
                  <input
                    type="Name"
                    className="form-control"
                    placeholder="Email"
                    name="name"
                    value={data.name}
                    // onChange={(e) => onChangeHandler(e)}
                    autoComplete="off"
                    readOnly
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user-shield"></span>
                    </div>
                  </div>
                </div>
              ))}

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
};
export default Edit;
