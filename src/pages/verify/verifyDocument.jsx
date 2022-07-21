const styles = {
  verifyBtn: {
    justifyContent: "center",
    display: "flex",
  },
};

const VerifyDocument = ({ verifyDocument }) => {
  return (
    <section className="content">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Verify Document</h3>
        </div>

        <div className="card-body">
          <form onClick={(e) => verifyDocument(e)} style={styles.verifyBtn}>
            <button type="button" className="btn btn-outline-warning">
              VERIFY
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VerifyDocument;
