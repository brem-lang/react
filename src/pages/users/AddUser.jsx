import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Swal from "sweetalert2";
import RedirectError from "../../routes/RedirectError";
import useAuth from "../../hooks/useAuth";
const initialValue = {
  name: "",
  email: "",
  pwd: "",
  confirmPwd: "",
  role:""
};

const CreateUser = () => {
  const {setRefresh } = useAuth();
  const [dataField, setDataField] = useState(initialValue);
  const navigate = useNavigate();
  const redirectError = RedirectError();
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setDataField({ ...dataField, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", dataField.name);
    formData.append("email", dataField.email);
    formData.append("password", dataField.pwd);
    formData.append("role", dataField.role);

    if (dataField.pwd !== dataField.confirmPwd)
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password do not match!',
      })


      // console.log(dataField)
    try {
      const res = await axios.post("/api/auth/register", formData);
      if (res.data.success === true) {
        Swal.fire(
          "Great!",
          "The user was successfully created.",
          "success"
        ).then(() => {
          setRefresh(true);
          navigate("/users")
        });
      }
    } catch (err) {
      switch (err.code) {
        case "ERR_BAD_REQUEST":
          return redirectError();

        default:
          return console.log(err, "default");
      }
    }
  };

  const close = (e) => {
    navigate("/")
  }

  return (
    <body className="hold-transition register-page">
      <div className="register-box">
        <div className="card">
          <div className="card-body register-card-body">
          <button
              onClick={() => close()}
              style={{ float: "right", border: "none", fontSize: 15 }}
              type="button"
              className="btn btn-outline-info"
            >
              Close
            </button>
            <p className="login-box-msg">Add User</p>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full name"
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
                  type="email"
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

              <p>Roles</p>
              <div className="input-group mb-3">
                <select 
                name="role"
                value={dataField.role}
                onChange={(e) => onChangeHandler(e)}
                className="form-control">
                    <option value="">None</option>
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

              <div className="row">
                <div className="col-8"></div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Register
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

export default CreateUser;
