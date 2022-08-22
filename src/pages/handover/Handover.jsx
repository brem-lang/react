import React, { useCallback, useEffect, useState } from "react";
import Logo from "../../assets/images/gfi.jpg";
import { useLocation, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

function Handover() {
  const location = useLocation();
  const data = {
    document_series_no: location.state.document_series_no,
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
            <div class="row">
              <div class="col-12">
                <Link to={"/handoverform"} state={data}>
                  <button type="submit" class="btn btn-primary btn-block">
                    Handover Form
                  </button>
                </Link>
                <br></br>
                <Link to={"/receiveform"} state={data}>
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
