import React from "react";

function AddApproval() {
  return (
    <body className="hold-transition register-page">
      <div className="register-box">
        <div className="card">
          <div className="card-body register-card-body">
            <button
              //   onClick={() => close()}
              style={{ float: "right", border: "none", fontSize: 15 }}
              type="button"
              className="btn btn-outline-info"
            >
              Close
            </button>
            <p className="login-box-msg">Department</p>

            <form>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Department"
                  name="name"
                  //   value={dataField.name}
                  //   onChange={(e) => onChangeHandler(e)}
                  autoComplete="off"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-building"></span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-8"></div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
}

export default AddApproval;
