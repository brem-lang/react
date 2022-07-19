import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section className="hold-transition login-page">
      <div className="card">
        <div className="card-header">
          <h5>Unauthorized</h5>
        </div>
        <div className="card-body">
          <br />
          <p>You do not have access to the requested page.</p>
          <div className="flexGrow">
            <button className="btn btn-primary" onClick={goBack}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Unauthorized;
