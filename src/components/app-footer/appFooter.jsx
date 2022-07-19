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
        Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>
        .
      </strong>
      All rights reserved.
      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> 3.2.0
      </div>
    </footer>
  );
};

export default AppFooter;