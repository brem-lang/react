import React from "react";
import moment from "moment";

const data = new Array(8).fill({
  date: "Aug 05, 2022 - 03:00 PM",
  name: "Kristine received form from ",
  department: "Production Department",
});

const Tracking = () => {
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Document Tracking</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">Document Tracking</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Content */}
        <section className="content tracking-content">
          <div className="login-box tracking-box">
            <div className="card tracking-card">
              <div className="card-body login-card-body tracking-card-body">
                <div className="login-box-msg tracking-title">
                  <h5>Approval Department</h5>
                  <p>Last update: 1 hour ago</p>
                  <h6>GFI-MI-2022-00002</h6>
                </div>

                <div className="div tracking-box-data">
                  {data.map((item, index) => (
                    <div className="tracking" key={index}>
                      <p>{item.date}</p>
                      <p>{item.name}</p>
                      <p>{item.department}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tracking;
