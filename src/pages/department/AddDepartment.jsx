import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Swal from "sweetalert2";
import RedirectError from "../../routes/RedirectError";
import useAuth from "../../hooks/useAuth";
const initialValue = {
  name: "",
};
function AddDepartment() {
  const { setRefresh } = useAuth();
  const [dataField, setDataField] = useState(initialValue);
  const navigate = useNavigate();
  const redirectError = RedirectError();
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setDataField({ ...dataField, [name]: value });
  };
  const { auth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };

    const formData = new FormData();
    formData.append("name", dataField.name);
    try {
      const res = await axios.post(
        "api/manage/department/store",
        formData,
        config
      );
      if (res.data.success === true) {
        Swal.fire(
          "Great!",
          "The user was successfully created.",
          "success"
        ).then(() => {
          setRefresh(true);
          navigate("/department");
        });
      }
    } catch (err) {
      switch (err.code) {
        case "ERR_BAD_REQUEST":
          return redirectError();

        default:
          return console.log(err, "default");
      }
    }
  };

  const close = (e) => {
    navigate("/department");
  };

  return (
    <body className="hold-transition register-page">
      <div className="register-box">
        <div className="card">
          <div className="card-body register-card-body">
            <button
              onClick={() => close()}
              style={{ float: "right", border: "none", fontSize: 15 }}
              type="button"
              className="btn btn-outline-info"
            >
              Close
            </button>
            <p className="login-box-msg">Department</p>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Department"
                  name="name"
                  value={dataField.name}
                  onChange={(e) => onChangeHandler(e)}
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

export default AddDepartment;
