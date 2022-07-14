import React, { Suspense } from "react";

import { Routes, Route } from "react-router-dom";

import { Layout, Dashboard, DataTable } from "./exporter";
import "./assets/css/app.css";

function App() {
  return (
    <Suspense fallback={"Loading"}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/data-table" element={<DataTable />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
