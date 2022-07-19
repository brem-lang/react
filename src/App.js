import React, { Suspense } from "react";

import { Routes, Route } from "react-router-dom";


import {
  Layout,
  Dashboard,
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
} from "./exporter";
import RequireAuth from "./routes/RequireAuth";

import ModalPdf from "./components/modal/modal";
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
              <Route path="/modal" element={<ModalPdf />} />
              <Route path="/create/wsmi" element={<CreateWsmi />} />
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
              <Route path="/mi-list" element={<MISlipList />} />
              <Route path="/mro-list" element={<MROSlipList />} />
              <Route path="/dm-list" element={<DMSlipList />} />
              <Route path="/fg-list" element={<FGSlipList />} />
              <Route path="/fa-list" element={<FASlipList />} />
              <Route path="/ma-list" element={<MASlipList />} />
              <Route path="/mr-list" element={<MRSlipList />} />
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
