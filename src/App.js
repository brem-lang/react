import React, { Suspense } from "react";

import { Routes, Route } from "react-router-dom";

import {
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
  AddUser,
  UpdateUser,
  Department,
  AddDepartment,
  MIView,
  AddApproval,
} from "./exporter";
import Layout from "./layout/Layout.component";
import RequireAuth from "./routes/RequireAuth";
import Spinner from "./components/spinner/spinner.component";
import CreateUser from "./pages/users/create-user";
import PersistLogin from "./routes/PersistLogin";

import "./assets/css/app.css";
import RequireRole from "./routes/RequireRoles";
import { ROLES } from "./data/roles";
import Testfile from "./pages/testfile";
import Maintenance from "./pages/maintenance/Maintenance";

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/verify/*" element={<Document />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/maintenance" element={<Maintenance />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Layout />}>
            <Route element={<RequireAuth />}>
              {/* all user can access this */}
              <Route path="/update-user" element={<UpdateUser />} />

              {/* Only Admin Access */}
              <Route
                element={<RequireRole allowedRoles={[ROLES.administrator]} />}
              >
                <Route index element={<Dashboard />} />
                <Route path="/data-table" element={<DataTable />} />
                <Route path="/user/create" element={<CreateUser />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/logs" element={<Logs />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/department" element={<Department />} />
                <Route path="/add-department" element={<AddDepartment />} />
                <Route path="/mi-view" element={<MIView />} />
                <Route path="/add-approval" element={<AddApproval />} />
              </Route>

              {/* MI clerk access */}
              <Route
                element={
                  <RequireRole
                    allowedRoles={[ROLES.administrator, ROLES.mi_clerk]}
                  />
                }
              >
                <Route path="/mi-slip" element={<MISlip />} />
                <Route path="/mi-logs" element={<MISlipList />} />
                <Route path="/mi-return" element={<MISlipReturn />} />
                <Route path="/mi-return-logs" element={<MISlipReturnLogs />} />
              </Route>

              {/* MRO clerk access */}
              <Route
                element={
                  <RequireRole
                    allowedRoles={[ROLES.administrator, ROLES.mro_clerk]}
                  />
                }
              >
                <Route path="/mro-slip" element={<MROSlip />} />
                <Route path="/mro-return" element={<MROSlipReturn />} />
                <Route path="/mro-logs" element={<MROSlipList />} />
                <Route
                  path="/mro-return-logs"
                  element={<MROSlipReturnLogs />}
                />
              </Route>

              {/* DM clerk access */}
              <Route
                element={
                  <RequireRole
                    allowedRoles={[ROLES.administrator, ROLES.dm_clerk]}
                  />
                }
              >
                <Route path="/dm-slip" element={<DMSlip />} />
                <Route path="/dm-logs" element={<DMSlipList />} />
                <Route path="/dm-return" element={<DMSlipReturn />} />
                <Route path="/dm-return-logs" element={<DMSlipReturnLogs />} />
              </Route>

              {/* FG clerk access */}
              <Route
                element={
                  <RequireRole
                    allowedRoles={[ROLES.administrator, ROLES.fg_clerk]}
                  />
                }
              >
                <Route path="/fg-slip" element={<FGSlip />} />
                <Route path="/fg-logs" element={<FGSlipList />} />
                <Route path="/fg-return" element={<FGSlipReturn />} />
                <Route path="/fg-return-logs" element={<FGSlipReturnLogs />} />
              </Route>

              {/* FA clerk access */}
              <Route
                element={
                  <RequireRole
                    allowedRoles={[ROLES.administrator, ROLES.fa_clerk]}
                  />
                }
              >
                <Route path="/fa-slip" element={<FASlip />} />
                <Route path="/fa-logs" element={<FASlipList />} />
                <Route path="/fa-return" element={<FASlipReturn />} />
                <Route path="/fa-return-logs" element={<FASlipReturnLogs />} />
              </Route>

              {/* MA clerk access */}
              <Route
                element={
                  <RequireRole
                    allowedRoles={[ROLES.administrator, ROLES.ma_clerk]}
                  />
                }
              >
                <Route path="/ma-slip" element={<MASlip />} />
                <Route path="/ma-logs" element={<MASlipList />} />
                <Route path="/ma-return" element={<MASlipReturn />} />
                <Route path="/ma-return-logs" element={<MASlipReturnLogs />} />
              </Route>

              {/* MR clerk access */}
              <Route
                element={
                  <RequireRole
                    allowedRoles={[ROLES.administrator, ROLES.mr_clerk]}
                  />
                }
              >
                <Route path="/mr-slip" element={<MRSlip />} />
                <Route path="/mr-logs" element={<MRSlipList />} />
              </Route>

              {/* SC clerk access */}
              <Route
                element={
                  <RequireRole
                    allowedRoles={[ROLES.administrator, ROLES.sc_clerk]}
                  />
                }
              >
                <Route path="/service-call" element={<ServiceCall />} />
                <Route path="/servicecall-logs" element={<ServiceCallList />} />
              </Route>
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>
        </Route>

        <Route path="/3testCenter-not-allowed" element={<Testfile />} />
      </Routes>
    </Suspense>
  );
}

export default App;
