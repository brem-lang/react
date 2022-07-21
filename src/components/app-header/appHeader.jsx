import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* <!-- Left navbar links --> */}

      {/* <!-- Right navbar links --> */}
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
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
