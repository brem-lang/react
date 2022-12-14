import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

const initialValue = {
  name: "",
  email: "",
  pwd: "",
  confirmPwd: "",
};

const CreateUser = () => {
  const [dataField, setDataField] = useState(initialValue);

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

    if (dataField.pwd !== dataField.confirmPwd)
      return alert("Password do not match");

    try {
      await axios.post("/api/auth/register", formData);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <body className="hold-transition register-page">
      <div className="register-box">
        <div className="register-logo">
          <Link to="/">
            <b>Gensan Feedmil, Inc.</b>
          </Link>
        </div>

        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new user</p>

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
              <div className="row">
                <div className="col-8"></div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Register
                  </button>
                </div>
              </div>
            </form>

            <a href="login.html" className="text-center">
              I already have a membership
            </a>
          </div>
        </div>
      </div>
    </body>
  );
};

export default CreateUser;
