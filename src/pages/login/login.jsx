import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";
import { ROLES } from "../../data/roles";
// import { ToastContainer, toast } from "react-toastify";


import useAuth from "../../hooks/useAuth";

const initialVal = {
  email: "",
  pwd: "",
};

const LoginPage = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();

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

      await axios.get("/sanctum/csrf-cookie").then(async () => {
        const res = await axios.post("/api/auth/login", formData);

        const resRole = res.data.user.roles;
        let userRoles = [];
        resRole.map((item) => userRoles.push(item.id));

        setAuth({
          token: res.data.token,
          status: res.data.status,
          user: dataField.email,
          roles: userRoles,
        });

        const localdata = {
          data: res.data,
          email: dataField.email,
          roles: userRoles,
        };

        localStorage.setItem("user", JSON.stringify(localdata));
        localStorage.setItem("gft", JSON.stringify(true));
        setDataField(initialVal);

        userRoles.map((item) => {
          switch (item) {
            case ROLES.administrator:
              return navigate("/", { replace: true });

            case ROLES.mi_clerk:
              return navigate("/mi-logs", { replace: true });

            case ROLES.mro_clerk:
              return navigate("/mro-logs", { replace: true });

            case ROLES.dm_clerk:
              return navigate("/dm-logs", { replace: true });

            case ROLES.fg_clerk:
              return navigate("/fg-logs", { replace: true });

            case ROLES.fa_clerk:
              return navigate("/fa-logs", { replace: true });

            case ROLES.ma_clerk:
              return navigate("/ma-logs", { replace: true });

            case ROLES.mr_clerk:
              return navigate("/mr-logs", { replace: true });

            case ROLES.sc_clerk:
              return navigate("/servicecall-logs", { replace: true });

            default:
              return navigate("/", { replace: true });
          }
        });
      });
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

  const notify = () =>
    toast.warn("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

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
          <div>
            {/* <button onClick={notify}>Notify !</button>

            <ToastContainer
              position="top-right"
              hideProgressBar={false}
              autoClose={false}
              newestOnTop={true}
              closeOnClick={false}
              draggable={false}
              rtl={false}
            /> */}
          </div>
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
                  <div className="icheck-primary d-none">
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
