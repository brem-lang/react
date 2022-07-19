import React from "react";

const Layout = React.lazy(() => import("./layout/Layout.component"));

const Dashboard = React.lazy(() => import("./pages/dashboard/dashboard"));
const Dashboardv2 = React.lazy(() => import("./pages/dashboard/dashboardv2"));
const Dashboardv3 = React.lazy(() => import("./pages/dashboard/dashboardv3"));

// Tables
const DataTable = React.lazy(() => import("./pages/tables/data"));

const CreateWsmi = React.lazy(() => import("./pages/wsmi/create-wsmi"));

const Document = React.lazy(() => import("./pages/verify/document"));

const LoginPage = React.lazy(() => import("./pages/login/login"));

const Unauthorized = React.lazy(() => import("./routes/Unauthorized"));

export {
  Layout,
  Dashboard,
  Dashboardv2,
  Dashboardv3,
  DataTable,
  CreateWsmi,
  Document,
  LoginPage,
  Unauthorized,
};
