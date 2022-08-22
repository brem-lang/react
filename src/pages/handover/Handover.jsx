import React from "react";
import Logo from "../../assets/images/gfi.jpg";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import RedirectError from "../../routes/RedirectError";

function Handover() {
  const navigate = useNavigate();
  const redirectError = RedirectError();
  const location = useLocation();

  console.log(location.state);

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
            <div class="row">
              <div class="col-12">
                <Link to={"/handoverform"} state={location.state}>
                  <button type="submit" class="btn btn-primary btn-block">
                    Handover Form
                  </button>
                </Link>
                <br></br>
                <Link to={"/receiveform"} state={location.state}>
                  <button type="submit" class="btn btn-primary btn-block">
                    Receive Form
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
    </div>
  );
}

export default Handover;
