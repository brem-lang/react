import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Logo from "../../assets/images/gfi.jpg";
import { ROLES } from "../../data/roles";
import useAuth from "../../hooks/useAuth";

const AppMenu = () => {
  const location = useLocation().pathname;
  const localUser = JSON.parse(localStorage.getItem("user"));
  const user = localUser ? localUser.email : "Name";
  const { auth } = useAuth();

  const allowedDashboard = [ROLES.administrator];
  const allowedMi = [ROLES.administrator, ROLES.mi_clerk];
  const allowedMro = [ROLES.administrator, ROLES.mro_clerk];
  const allowedDm = [ROLES.administrator, ROLES.dm_clerk];
  const allowedFg = [ROLES.administrator, ROLES.fg_clerk];
  const allowedFa = [ROLES.administrator, ROLES.fa_clerk];
  const allowedMa = [ROLES.administrator, ROLES.ma_clerk];
  const allowedMr = [ROLES.administrator, ROLES.mr_clerk];
  const allowedSc = [ROLES.administrator, ROLES.sc_clerk];

  // const parentRoute = () => {
  //   // let route;
  //   const userRole = auth?.roles;
  //   const miRole = auth?.roles?.find((role) => allowedMi?.includes(role));
  //   const mroRole = auth?.roles?.find((role) => allowedMro?.includes(role));
  //   const dmRole = auth?.roles?.find((role) => allowedDm?.includes(role));
  //   const fgRole = auth?.roles?.find((role) => allowedFg?.includes(role));
  //   const faRole = auth?.roles?.find((role) => allowedFa?.includes(role));
  //   const maRole = auth?.roles?.find((role) => allowedMa?.includes(role));
  //   const mrRole = auth?.roles?.find((role) => allowedMr?.includes(role));
  //   const scRole = auth?.roles?.find((role) => allowedSc?.includes(role));
  //   switch (userRole) {
  //     case userRole === miRole:
  //       return "/mi-logs";
  //     case userRole === mroRole:
  //       return "/mro-logs";

  //     case userRole === dmRole:
  //       return "/dm-logs";

  //     case userRole === fgRole:
  //       return "/fg-logs";

  //     case userRole === faRole:
  //       return "/fa-logs";

  //     case userRole === maRole:
  //       return "/ma-logs";

  //     case userRole === mrRole:
  //       return "/mr-logs";

  //     case userRole === scRole:
  //       return "/servicecall-logs";

  //     default:
  //       return "/mi-logs";
  //   }
  // };

  useEffect(() => {
    const trees = window.$('[data-widget="treeview"]');
    trees.Treeview("init");
  }, []);

  return (
    <aside className="main-sidebar sidebar-primary elevation-4">
      <Link to="/" className="brand-link">
        <img
          src={Logo}
          alt="AdminLTE Logo"
          // className="brand-image"
          width="230" 
          height="70"
          // style={{ opacity: "0.8" }}
        />
        {/* <span className="brand-text font-weight">
          Gensan Feedmill, Inc.
        </span> */}
      </Link>
      <br></br>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
            <Link to="/" className="d-block">
              {user}
            </Link>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column nav-link"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {auth?.roles?.find((role) => allowedDashboard?.includes(role)) && (
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${location === "/" && "active"}`}
                >
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                </Link>
              </li>
            )}

            <li className="nav-item">
              <a
                href="#"
                data-toggle="collapse"
                className={`nav-link 
                ${location === "/mi-logs" && "active"}
                ${location === "/mro-logs" && "active"}
                ${location === "/dm-logs" && "active"}
                ${location === "/fg-logs" && "active"}
                ${location === "/fa-logs" && "active"}
                ${location === "/ma-logs" && "active"}
                ${
                  location === "/mr-logs" && "active"
                }                             
                `}
              >
                <i className="nav-icon fas fa-edit"></i>
                <p>
                  Withdrawal Slip
                  <i className="fas fa-angle-left right"></i>
                </p>
              </a>

              <ul className="nav-treeview">
                {auth?.roles?.find((role) => allowedMi?.includes(role)) && (
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
                )}

                {auth?.roles?.find((role) => allowedMro?.includes(role)) && (
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
                )}

                {auth?.roles?.find((role) => allowedDm?.includes(role)) && (
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
                )}

                {auth?.roles?.find((role) => allowedFg?.includes(role)) && (
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
                )}

                {auth?.roles?.find((role) => allowedFa?.includes(role)) && (
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
                )}

                {auth?.roles?.find((role) => allowedMa?.includes(role)) && (
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
                )}

                {auth?.roles?.find((role) => allowedMr?.includes(role)) && (
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
                )}

                {auth?.roles?.find((role) => allowedSc?.includes(role)) && (
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
                )}
              </ul>
            </li>

            <li className="nav-item">
              <a
                href="#"
                className={`nav-link
              ${location === "/mi-return-logs" && "active"}
              ${location === "/mro-return-logs" && "active"}
              ${location === "/dm-return-logs" && "active"}
              ${location === "/fg-return-logs" && "active"}
              ${location === "/fa-return-logs" && "active"}
              ${location === "/ma-return-logs" && "active"}
              `}
              >
                <i className="nav-icon fas fa-table"></i>
                <p>
                  Return Slip
                  <i className="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul className="nav-treeview">
                {auth?.roles?.find((role) => allowedMi?.includes(role)) && (
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
                )}
                {auth?.roles?.find((role) => allowedMro?.includes(role)) && (
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
                )}
                {auth?.roles?.find((role) => allowedDm?.includes(role)) && (
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
                )}

                {auth?.roles?.find((role) => allowedFg?.includes(role)) && (
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
                )}

                {auth?.roles?.find((role) => allowedFa?.includes(role)) && (
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
                )}

                {auth?.roles?.find((role) => allowedMa?.includes(role)) && (
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
                )}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AppMenu;
