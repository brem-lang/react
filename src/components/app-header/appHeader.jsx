const AppHeader = () => {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* <!-- Left navbar links --> */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>

      {/* <!-- Right navbar links --> */}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="control-sidebar"
            data-controlsidebar-slide="true"
            href="/"
            role="button"
          >
            <i className="fas fa-th-large"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default AppHeader;
