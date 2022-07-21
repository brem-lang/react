import { Link, useLocation } from "react-router-dom";

import Logo from "../../assets/images/qrcode.png";

const AppMenu = () => {
  const location = useLocation().pathname;

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/" className="brand-link">
        <img
          src={Logo}
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: "0.8" }}
        />
        <span className="brand-text font-weight-light">
          Gensan Feedmil, Inc.
        </span>
      </Link>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src={Logo} className="img-circle elevation-2" alt="User" />
          </div>
          <div className="info">
            <Link to="/" className="d-block">
              admin@email.com
            </Link>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item menu-open">
              <Link
                to="/"
                className={`nav-link ${location === "/" && "active"}`}
              >
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
                <i class="right fas fa-angle-left"></i>
              </Link>

              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <Link
                    to="/"
                    className={`nav-link ${location === "/" && "active"}`}
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Dashboard</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link
                to="#"
                className={`nav-link 
                ${location === "/mi-slip" && "active"}
                ${location === "/mro-slip" && "active"}
                ${location === "/dm-slip" && "active"}
                ${location === "/fg-slip" && "active"}
                ${location === "/fa-slip" && "active"}
                ${location === "/ma-slip" && "active"}
                ${location === "/mr-slip" && "active"}
                ${location === "/service-call" && "active"}
                `}
              >
                <i className="nav-icon fas fa-edit"></i>
                <p>
                  Withdrawal Slip
                  <i className="fas fa-angle-left right"></i>
                </p>
              </Link>

              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link
                    to="/mi-slip"
                    className={`nav-link ${
                      location === "/mi-slip" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>MI</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/mro-slip"
                    className={`nav-link ${
                      location === "/mro-slip" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>MRO</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/dm-slip"
                    className={`nav-link ${
                      location === "/dm-slip" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>DM</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/fg-slip"
                    className={`nav-link ${
                      location === "/fg-slip" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>FG</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/fa-slip"
                    className={`nav-link ${
                      location === "/fa-slip" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>FA</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/ma-slip"
                    className={`nav-link ${
                      location === "/ma-slip" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>MA</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/mr-slip"
                    className={`nav-link ${
                      location === "/mr-slip" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>MR</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/service-call"
                    className={`nav-link ${
                      location === "/service-call" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>Service Call</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link
                to="#"
                className={`nav-link 
                ${location === "/mi-logs" && "active"}
                ${location === "/mro-logs" && "active"}
                ${location === "/dm-logs" && "active"}
                ${location === "/fg-logs" && "active"}
                ${location === "/fa-logs" && "active"}
                ${location === "/ma-logs" && "active"}
                ${location === "/mr-logs" && "active"}
                `}
              >
                <i className="nav-icon fas fa-table"></i>
                <p>
                  Withdrawal Slip Log
                  <i className="fas fa-angle-left right"></i>
                </p>
              </Link>

              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link
                    to="/mi-logs"
                    className={`nav-link ${
                      location === "/mi-logs" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>MI</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/mro-logs"
                    className={`nav-link ${
                      location === "/mro-logs" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>MRO</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/dm-logs"
                    className={`nav-link ${
                      location === "/dm-logs" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>DM</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/fg-logs"
                    className={`nav-link ${
                      location === "/fg-logs" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>FG</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/fa-logs"
                    className={`nav-link ${
                      location === "/fa-logs" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>FA</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/ma-logs"
                    className={`nav-link ${
                      location === "/ma-logs" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>MA</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/mr-logs"
                    className={`nav-link ${
                      location === "/mr-logs" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>MR</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link
                to="#"
                className={`nav-link
                ${location === "/mi-return" && "active"}
                ${location === "/mro-return" && "active"}
                ${location === "/dm-return" && "active"}
                ${location === "/fg-return" && "active"}
                ${location === "/fa-return" && "active"}
                ${location === "/ma-return" && "active"}
              `}
              >
                <i className="nav-icon fas fa-edit"></i>
                <p>
                  Return Slip
                  <i className="fas fa-angle-left right"></i>
                </p>
              </Link>

              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link
                    to="/mi-return"
                    className={`nav-link ${
                      location === "/mi-return" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>MI</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/mro-return"
                    className={`nav-link ${
                      location === "/mro-return" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>MRO</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/dm-return"
                    className={`nav-link ${
                      location === "/dm-return" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>DM</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/fg-return"
                    className={`nav-link ${
                      location === "/fg-return" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>FG</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/fa-return"
                    className={`nav-link ${
                      location === "/fa-return" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>FA</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/ma-return"
                    className={`nav-link ${
                      location === "/ma-return" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>MA</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link
              ${location === "/mi-return-logs" && "active"}
              ${location === "/servicecall-logs" && "active"}
              ${location === "/mro-return-logs" && "active"}
              ${location === "/dm-return-logs" && "active"}
              ${location === "/fg-return-logs" && "active"}
              ${location === "/fa-return-logs" && "active"}
              ${location === "/ma-return-logs" && "active"}
              `}
              >
                <i className="nav-icon fas fa-table"></i>
                <p>
                  Return Slip Log
                  <i className="fas fa-angle-left right"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link
                    to="/mi-return-logs"
                    className={`nav-link ${
                      location === "/mi-return-logs" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>MI</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/servicecall-logs"
                    className={`nav-link ${
                      location === "/servicecall-logs" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>Service Call</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/mro-return-logs"
                    className={`nav-link ${
                      location === "/mro-return-logs" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>MRO</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/dm-return-logs"
                    className={`nav-link ${
                      location === "/dm-return-logs" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>DM</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/fg-return-logs"
                    className={`nav-link ${
                      location === "/fg-return-logs" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>FG</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/fa-return-logs"
                    className={`nav-link ${
                      location === "/fa-return-logs" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>FA</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/ma-return-logs"
                    className={`nav-link ${
                      location === "/ma-return-logs" && "active"
                    }`}
                  >
                    <i className="far fa-circle nav-icon"></i>
                    <p>MA</p>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AppMenu;
