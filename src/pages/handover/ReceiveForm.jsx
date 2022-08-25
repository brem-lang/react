import React, { useCallback, useEffect } from "react";
import Logo from "../../assets/images/gfi.jpg";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import Swal from "sweetalert2";
import { QrReader } from "react-qr-reader";
// const initialValue = {
//   name: "",
// };
function ReceiveForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  // const [dataField, setDataField] = useState(initialValue);
  const [selected, setSelected] = useState();
  const [approvalDept, setApprovalDept] = useState();
  const [isScanner, setIsScanner] = useState(false);
  const [data, setData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  // const onChangeHandler = (e) => {
  //   const { name, value } = e.target;
  //   setDataField({ ...dataField, [name]: value });
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("document_series_no", location.state.document_series_no);
    formData.append("person", data);
    formData.append("department", selected);
    try {
      const res = await axios.post("/api/receiveForm", formData);
      if (res.data.success === true) {
        setIsSuccess(true);
      }
    } catch (err) {
      console.log(err.response);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pls Fill up the Fields",
      });
    }
  };

  const getData = useCallback(async () => {
    const config = {
      params: {
        document_series_no: location.state.document_series_no,
        type: "Receive",
      },
    };

    try {
      const res = await axios("/api/formDepartmentAvailable", config);
      setApprovalDept(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err.response);
      // switch (err.code) {
      //   case "ERR_BAD_REQUEST":
      //     return console.log("Bad Request");

      //   default:
      //     return console.log(err, "default");
      // }
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const close = (e) => {
    navigate(-2);
  };

  const openScanner = (e) => {
    setIsScanner(true);
    setData();
  };

  const closeScanner = (e) => {
    setIsScanner(false);
  };
  return (
    <>
      {isScanner === true ? (
        <>
          <h1
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              textAlign: "center",
            }}
          >
            SCAN QR CODE HERE
          </h1>
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "50%",
            }}
          >
            <QrReader
              constraints={{ facingMode: "environment" }}
              onResult={(result, error) => {
                if (!!result) {
                  setData(result?.text);
                }

                if (!!error) {
                  console.info(error);
                }
              }}
            />
            {data === undefined ? null : <>{closeScanner()}</>}
          </div>
        </>
      ) : (
        <div
          className="hold-transition login-page"
          style={{ backgroundColor: "white" }}
        >
          <div className="login-box">
            <div className="login-logo">
              <img src={Logo} alt="AdminLTE Logo" width="400" height="120" />
            </div>
            {/* /.login-logo */}
            {isSuccess ? (
              <>
                <h1 style={{ fontSize: 50, textAlign: "center" }}>Success!!</h1>
                <button
                  onClick={() => close()}
                  style={{ marginLeft: 150, fontSize: 15 }}
                  type="button"
                  className="btn btn-outline-info"
                >
                  Close
                </button>
              </>
            ) : (
              <div className="card">
                <div className="card-body login-card-body">
                  <p className="login-box-msg">Handover Form</p>
                  <form
                  >
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="name"
                        value={data}
                        autoComplete="off"
                        readOnly
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-user"></span>
                        </div>
                      </div>
                    </div>

                    <div className="input-group mb-3">
                      <select
                        className="form-control"
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                        required
                      >
                        <option selected="selected">Select Department</option>
                        {approvalDept?.map((data) => (
                          <option value={data.department}>
                            {data.department}
                          </option>
                        ))}
                      </select>

                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-building"></span>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div class="row">
                    <div class="col-4">
                      <button
                        class="btn btn-success btn-block"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Submit
                      </button>
                    </div>
                    <div class="col-4">
                      <button
                        class="btn btn-success btn-block"
                        onClick={() => openScanner()}
                      >
                        Scan QR
                      </button>
                    </div>
                    <div class="col-4">
                      <button
                        onClick={() => close()}
                        class="btn btn-primary btn-block"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
                {/* /.login-card-body */}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ReceiveForm;
