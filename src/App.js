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
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
