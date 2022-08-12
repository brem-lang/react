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
        <h1>Document Verification</h1>
        <div
          className="card-header clearfix"
          style={{ maxHeight: "10rem", border: "none" }}
        >
          <blockquote
            className="quote-success"
            style={{ background: "transparent" }}
          >
            <p>This document is authentic document</p>
            <small>
              from <cite title="Source Title">Gensan Feedmil, inc.</cite>
            </small>
          </blockquote>
        </div>

        <div className="card-body" style={{ border: "none" }}>
          <div
            className="form-group"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label style={{ fontSize: "24px", fontWeight: "bold" }}>
              {data.document_series_no}
            </label>
            <p>Document No.</p>
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
          <Link to={"/handover"} state={data}>
            <button type="button" class="btn btn-outline-light">
              Handover
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ValidDocument;
