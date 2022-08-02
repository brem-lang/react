import React from "react";
import Logo from "../../assets/images/gfi.jpg";
// import { ThreeDots } from "react-loader-spinner";

export default function Maintenance() {
  return (
    <div
      className="hold-transition login-page"
      style={{ backgroundColor: "grey" }}
    >
      <div className="card">
        <div className="card-title">
          <img src={Logo} alt="Gensan Feedmill, Inc." />
        </div>
        <div
          className="card-body login-card-body"
          style={{ display: "grid", justifyContent: "center" }}
        >
          <div style={{ display: "grid", justifySelf: "center" }}>
            {/* <ThreeDots color="#0c9a48" height={80} width={80} /> */}
          </div>
          <h1 style={{ fontSize: 50 }}>Sorry! We are under maintenance!!</h1>
        </div>
      </div>
    </div>
  );
}
