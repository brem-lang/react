import React from "react";

const Layout = React.lazy(() => import("./layout/Layout.component"));

const Dashboard = React.lazy(() => import("./pages/dashboard/dashboard"));
const Dashboardv2 = React.lazy(() => import("./pages/dashboard/dashboardv2"));
const Dashboardv3 = React.lazy(() => import("./pages/dashboard/dashboardv3"));

// Tables
const DataTable = React.lazy(() => import("./pages/tables/data"));
const UserList = React.lazy(() => import("./pages/tables/listUsers"));
const Logs = React.lazy(() => import("./pages/tables/Logs"));

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

// return slip
const MISlipReturn = React.lazy(() => import("./pages/return/MIReturnSlip"));
const MROSlipReturn = React.lazy(() => import("./pages/return/MROReturnSlip"));
const DMSlipReturn = React.lazy(() => import("./pages/return/DMReturnSlip"));
const FGSlipReturn = React.lazy(() => import("./pages/return/FGReturnSlip"));
const FASlipReturn = React.lazy(() => import("./pages/return/FAReturnSlip"));
const MASlipReturn = React.lazy(() => import("./pages/return/MAReturnSlip"));

// slip tables
const MISlipList = React.lazy(() => import("./pages/tables/MISlipList"));
const MROSlipList = React.lazy(() => import("./pages/tables/MROSlipList"));
const DMSlipList = React.lazy(() => import("./pages/tables/DMSlipList"));
const FGSlipList = React.lazy(() => import("./pages/tables/FGSlipList"));
const FASlipList = React.lazy(() => import("./pages/tables/FASlipList"));
const MASlipList = React.lazy(() => import("./pages/tables/MASlipList"));
const MRSlipList = React.lazy(() => import("./pages/tables/MRSlipList"));

// return slip logs
const MISlipReturnLogs = React.lazy(() => import("./pages/returnTables/MIReturnList"));
const MROSlipReturnLogs = React.lazy(() => import("./pages/returnTables/MROReturnList"));
const DMSlipReturnLogs = React.lazy(() => import("./pages/returnTables/DMReturnList"));
const FGSlipReturnLogs = React.lazy(() => import("./pages/returnTables/FGReturnList"));
const FASlipReturnLogs = React.lazy(() => import("./pages/returnTables/FAReturnList"));
const MASlipReturnLogs = React.lazy(() => import("./pages/returnTables/MAReturnList"));


export {
  Layout,
  Dashboard,
  Dashboardv2,
  Dashboardv3,
  DataTable,
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
  Logs,
  MISlipReturn,
  MROSlipReturn,
  DMSlipReturn,
  FGSlipReturn,
  FASlipReturn,
  MASlipReturn,
  MISlipReturnLogs,
  MROSlipReturnLogs,
  DMSlipReturnLogs,
  FGSlipReturnLogs,
  FASlipReturnLogs,
  MASlipReturnLogs,
};
