import React from 'react'
import useAuth from "../../hooks/useAuth";
function UpdateUser() {
    const { auth } = useAuth();
    console.log(auth)
  return (
    <body className="hold-transition register-page">
    <div className="register-box">
      <div className="card">
        <div className="card-body register-card-body">
          <p className="login-box-msg">Update</p>
          <form >
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full name"
                name="name"
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
        </div>
      </div>
    </div>
  </body>
  )
}

export default UpdateUser