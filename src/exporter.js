import React from "react";

const Layout = React.lazy(() => import("./layout/Layout.component"));

const Dashboard = React.lazy(() => import("./pages/dashboard/dashboard"));
const Dashboardv2 = React.lazy(() => import("./pages/dashboard/dashboardv2"));
const Dashboardv3 = React.lazy(() => import("./pages/dashboard/dashboardv3"));

// Tables
const DataTable = React.lazy(() => import("./pages/tables/data"));
const UserList = React.lazy(() => import("./pages/tables/listUsers"));
const Logs = React.lazy(() => import("./pages/tables/Logs"));


const CreateWsmi = React.lazy(() => import("./pages/wsmi/create-wsmi"));

const Document = React.lazy(() => import("./pages/verify/document"));

const LoginPage = React.lazy(() => import("./pages/login/login"));

const Unauthorized = React.lazy(() => import("./routes/Unauthorized"));

// slip
const MISlip = React.lazy(() => import("./pages/slip/MISlip"));
const MROSlip = React.lazy(() => import("./pages/slip/MROSlip"));
const DMSlip = React.lazy(() => import("./pages/slip/DMSLip"));
const FGSlip = React.lazy(() => import("./pages/slip/FGSlip"));
const FASlip = React.lazy(() => import("./pages/slip/FASlip"));
const MASlip = React.lazy(() => import("./pages/slip/MASlip"));
const MRSlip = React.lazy(() => import("./pages/slip/MRSlip"));
const ServiceCall = React.lazy(() => import("./pages/slip/ServiceCall"));

// slip tables
const MISlipList = React.lazy(() => import("./pages/tables/MISlipList"));
const MROSlipList = React.lazy(() => import("./pages/tables/MROSlipList"));
const DMSlipList = React.lazy(() => import("./pages/tables/DMSlipList"));
const FGSlipList = React.lazy(() => import("./pages/tables/FGSlipList"));
const FASlipList = React.lazy(() => import("./pages/tables/FASlipList"));
const MASlipList = React.lazy(() => import("./pages/tables/MASlipList"));
const MRSlipList = React.lazy(() => import("./pages/tables/MRSlipList"));


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
  MISlip,
  MROSlip,
  DMSlip,
  FGSlip,
  FASlip,
  MASlip,
  MRSlip,
  UserList,
  ServiceCall,
  MISlipList,
  MROSlipList,
  DMSlipList,
  FGSlipList,
  FASlipList,
  MASlipList,
  MRSlipList,
  Logs
};
