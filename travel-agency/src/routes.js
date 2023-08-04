import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./hoc/layout";

import Home from "./components/Home/home";
import EnquiryTable from "./components/EnqiryRecords/EnquiryRecords";

const AllRoutes = () => (
  <div>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/enquiry" element={<EnquiryTable />} />
      </Routes>
    </Layout>
  </div>
);

export default AllRoutes;
