import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Unauthorized = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const goBack = () => navigate(-1);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="content-wrapper">
      <div className="content">
        <section className="hold-transition login-page">
          <div className="card">
            <div className="card-header">
              <h5>Unauthorized</h5>
            </div>
            <div className="card-body">
              <br />
              <p>You do not have access to the requested page.</p>
              <div className="flexGrow d-flex justify-content-between">
                <button className="btn btn-primary" onClick={goBack}>
                  Go Back
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Unauthorized;
