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
        Copyright &copy; 2022<a href="https://www.gensanfeedmill.com/">Gensan Feedmil, Inc.</a>
        .
      </strong>
      All rights reserved.
      <div className="float-right d-none d-sm-inline-block">
      </div>
    </footer>
  );
};

export default AppFooter;
