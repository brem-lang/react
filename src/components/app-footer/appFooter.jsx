const customStyles = {
  mainFooter: {
    bottom: 0,
    left: 0,
    position: "fixed",
    right: 0,
    zIndex: 1032,
  },
};

const AppFooter = () => {
  return (
    <footer className="main-footer" style={customStyles.mainFooter}>
      <strong>
        &copy;{" "}
        <a href="https://www.gensanfeedmill.com/">Gensan Feedmil, Inc.</a> All
        rights reserved.
      </strong>
      <div className="float-right d-none d-sm-inline-block">
        <strong>
          DocuGen is proudly designed, built and continually enhanced by
          Classify Inc.
        </strong>
      </div>
    </footer>
  );
};

export default AppFooter;
