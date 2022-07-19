import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const initialVal = {
  email: "",
  pwd: "",
};

const LoginPage = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [dataField, setDataField] = useState(initialVal);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setDataField({ ...dataField, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", dataField.email);
      formData.append("password", dataField.pwd);

      const res = await axios.post(
        "http://172.16.0.118/api/auth/login",
        formData
      );

      setAuth({
        token: res.data.token,
        status: res.data.status,
        user: dataField.email,
      });

      const localdata = {
        data: res.data,
        email: dataField.email,
      };

      localStorage.setItem("user", JSON.stringify(localdata));
      setDataField(initialVal);
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      if (err.response.data.success === false)
        return alert("Wrong email or password!");
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div
      className="hold-transition login-page"
      style={{ backgroundColor: "grey" }}
    >
      <div className="login-box">
        <div className="login-logo">
          <Link to="/">
            <b>Gensan Feedmil, Inc.</b>
          </Link>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={dataField.email}
                  onChange={(e) => onChangeHandler(e)}
                  required
                  autoComplete="off"
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
                  required
                  autoComplete="off"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="persist"
                      onChange={togglePersist}
                      checked={persist}
                    />
                    <label htmlFor="persist">Remember Me</label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
