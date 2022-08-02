import React from "react";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Swal from "sweetalert2";

const Edit = ({ item, close }) => {
 let roles = [];
 item.roles.length !== 0 && roles.push(item.roles[0]?.name)
//  roles.push(item.roles.length !== 0 ? item.roles[0]?.name : "" )
 console.log(roles)
  //save initial value
  const initialValue = {
    email: item.email,
    name: item.name,
    pwd: "",
    confirmPwd: "",
    role:""
  };
  const { auth } = useAuth();
  const [dataField, setDataField] = useState(initialValue);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setDataField({ ...dataField, [name]: value });
  };
 console.log(item)
//  console.log(item.roles[0].name)
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
    formData.append("role", dataField.role);

    if (dataField.pwd !== dataField.confirmPwd)
      return alert("Password do not match");

      console.log(dataField)
      console.log(dataField.role)
    try {
      const res = await axios.post("/api/user/update", formData, config);
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
              {/* {roles.map((data,index) => ( */}
              <div className="input-group mb-3">
                <select 
                name="role"
                value={dataField.role}
                onChange={(e) => onChangeHandler(e)}
                className="form-control">
                    <option value={roles.length !== 0 ? roles : "" }>{roles.length !== 0 ? roles : "None"  }</option>
                    <option value="mi_clerk">MI Clerk</option>
                    <option value="mro_clerk">MRO Clerk</option>
                    <option value="dm_clerk">DM Clerk</option>
                    <option value="fg_clerk">FG Clerk</option>
                    <option value="fa_clerk">FA Clerk</option>
                    <option value="ma_clerk">MA Clerk</option>
                    <option value="mr_clerk">MR Clerk</option>
                    <option value="sc_clerk">SC Clerk</option>
                  </select>
                <div className="input-group-append">
                  <div className="input-group-text">
                    {/* <span className="fas fa-lock"></span> */}
                  </div>
                </div>
              </div>
              {/* ))} */}
              {/* {roles.map((data) => (
                <div className="input-group mb-3" key={data.id}>
                  <input
                    type="Name"
                    className="form-control"
                    placeholder="Email"
                    name="name"
                    value={data.name}
                    autoComplete="off"
                    readOnly
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user-shield"></span>
                    </div>
                  </div>
                </div>
              ))} */}

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
