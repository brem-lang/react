const ValidDocument = ({ data, close }) => {
  return (
    <section className="content">
      <div className="card" style={{ height: "min(80vh)" }}>
        <div className="card-header">
          <h3 className="card-title">Gensan Feedmil, Inc.</h3>
          <button
            className="btn btn-primary"
            style={{ float: "right" }}
            onClick={() => close()}
          >
            Close
          </button>
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
            <label style={{ marginRight: 12 }}>Customer Name:</label>
            <p>{data.customer_name}</p>
          </div>
          <div className="form-group" style={{ display: "flex" }}>
            <label style={{ marginRight: 12 }}>Prepared by:</label>
            <p>{data.prepared_by}</p>
          </div>
          <div className="form-group" style={{ display: "flex" }}>
            <label style={{ marginRight: 12 }}>Released by:</label>
            <p>{data.released_by}</p>
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
