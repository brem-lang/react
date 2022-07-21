import React, { Suspense } from "react";

import { Routes, Route } from "react-router-dom";

import {
  Layout,
  Dashboard,
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
  ServiceCallList,
} from "./exporter";
import RequireAuth from "./routes/RequireAuth";

import Spinner from "./components/spinner/spinner.component";

import "./assets/css/app.css";
import CreateUser from "./pages/users/create-user";
import PersistLogin from "./routes/PersistLogin";

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/verify/*" element={<Document />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Layout />}>
            <Route element={<RequireAuth />}>
              <Route index element={<Dashboard />} />
              <Route path="/data-table" element={<DataTable />} />
              <Route path="/user/create" element={<CreateUser />} />

              <Route path="/mi-slip" element={<MISlip />} />
              <Route path="/mro-slip" element={<MROSlip />} />
              <Route path="/dm-slip" element={<DMSlip />} />
              <Route path="/fg-slip" element={<FGSlip />} />
              <Route path="/fa-slip" element={<FASlip />} />
              <Route path="/ma-slip" element={<MASlip />} />
              <Route path="/mr-slip" element={<MRSlip />} />
              <Route path="/service-call" element={<ServiceCall />} />
              {/* slip tables */}
              <Route path="/mi-logs" element={<MISlipList />} />
              <Route path="/mro-logs" element={<MROSlipList />} />
              <Route path="/dm-logs" element={<DMSlipList />} />
              <Route path="/fg-logs" element={<FGSlipList />} />
              <Route path="/fa-logs" element={<FASlipList />} />
              <Route path="/ma-logs" element={<MASlipList />} />
              <Route path="/mr-logs" element={<MRSlipList />} />
              <Route path="/servicecall-logs" element={<ServiceCallList />} />
              {/* return slip */}
              <Route path="/mi-return" element={<MISlipReturn />} />
              <Route path="/mro-return" element={<MROSlipReturn />} />
              <Route path="/dm-return" element={<DMSlipReturn />} />
              <Route path="/fg-return" element={<FGSlipReturn />} />
              <Route path="/fa-return" element={<FASlipReturn />} />
              <Route path="/ma-return" element={<MASlipReturn />} />
              {/* return slip table */}
              <Route path="/mi-return-logs" element={<MISlipReturnLogs />} />
              <Route path="/mro-return-logs" element={<MROSlipReturnLogs />} />
              <Route path="/dm-return-logs" element={<DMSlipReturnLogs />} />
              <Route path="/fg-return-logs" element={<FGSlipReturnLogs />} />
              <Route path="/fa-return-logs" element={<FASlipReturnLogs />} />
              <Route path="/ma-return-logs" element={<MASlipReturnLogs />} />
              {/* tables */}
              <Route path="/users" element={<UserList />} />
              <Route path="/logs" element={<Logs />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
