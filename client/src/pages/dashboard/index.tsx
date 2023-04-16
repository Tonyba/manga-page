import Dashboard from "@/components/dashboardContent/Dashboard";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { NextPageWithLayout } from "@/utils/types";
import React, { ReactElement } from "react";

const DashboardPage: NextPageWithLayout = () => {
  return <Dashboard />;
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardPage;
