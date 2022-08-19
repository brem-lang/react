import moment from "moment";
import { Link } from "react-router-dom";

const ValidDocument = ({ data }) => {
  return (
    <section
      className="content"
      style={{
        display: "grid",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "100%",
      }}
    >
      <div
        // className="card"
        style={{
          height: "min(55vh)",
          width: "535px",
          background: "transparent",
        }}
      >
        <div className="card-body" style={{ border: "none" }}>
          <div
            className="form-group"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h1>{data.document_series_no}</h1>
            <label style={{ fontSize: "24px", fontWeight: "lighter" }}>
              is authentic document
            </label>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              className="form-group"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label>{moment(data.created_at).format("ll")}</label>
              <p>DATE CREATED</p>
            </div>
            <div
              className="form-group"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label>{data.prepared_by}</label>
              <p style={{ marginRight: 12 }}>PREPARED BY</p>
            </div>
            <div
              className="form-group"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label>{data.approved_by}</label>
              <p>APPROVED BY</p>
            </div>
          </div>
        </div>

        <div
          className="card-footer"
          style={{ border: "none", background: "transparent" }}
        >
          {data.status_label === "Open" && data.status.length !== 0 && (
            <Link to={"/handover"} state={data}>
              <button type="button" class="btn btn-outline-light">
                Handover
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default ValidDocument;
