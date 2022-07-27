import moment from "moment";

const ValidDocument = ({ data }) => {
  return (
    <section className="content">
      <div className="card" style={{ height: "min(80vh)" }}>
        <div className="card-header">
          <h3 className="card-title">Gensan Feedmil, Inc.</h3>
        </div>

        <div className="card-body clearfix" style={{ maxHeight: "10rem" }}>
          <blockquote className="quote-success">
            <p>This document is a valid document</p>
            <small>
              from <cite title="Source Title">Gensan Feedmil, inc.</cite>
            </small>
          </blockquote>
        </div>

        <div className="card-body">
          <div className="form-group" style={{ display: "flex" }}>
            <label style={{ marginRight: 12 }}>Document No.:</label>
            <p>{data.document_series_no}</p>
          </div>
          <div className="form-group" style={{ display: "flex" }}>
            <label style={{ marginRight: 12 }}>Date created:</label>
            <p>{moment(data.created_at).format("ll")}</p>
          </div>
          <div className="form-group" style={{ display: "flex" }}>
            <label style={{ marginRight: 12 }}>Prepared by:</label>
            <p>{data.prepared_by}</p>
          </div>
          <div className="form-group" style={{ display: "flex" }}>
            <label style={{ marginRight: 12 }}>Approved by:</label>
            <p>{data.approved_by}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValidDocument;
