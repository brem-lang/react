const ValidDocument = () => {
  return (
    <section className="content">
      <div className="card" style={{ height: "min(80vh)" }}>
        <div class="card-header">
          <h3 class="card-title">Gensan Feedmil, Inc.</h3>
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
            <p>GFI-DM-2022-980</p>
          </div>
          <div className="form-group" style={{ display: "flex" }}>
            <label style={{ marginRight: 12 }}>Document Type:</label>
            <p>Merchandise</p>
          </div>
          <div className="form-group" style={{ display: "flex" }}>
            <label style={{ marginRight: 12 }}>Document Type:</label>
            <p>Merchandise</p>
          </div>
          <div className="form-group" style={{ display: "flex" }}>
            <label style={{ marginRight: 12 }}>Document Date:</label>
            <p>21 June 2022</p>
          </div>
          <div className="form-group" style={{ display: "flex" }}>
            <label style={{ marginRight: 12 }}>Department:</label>
            <p>Human Resource Management Office</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValidDocument;
