import ContentList from "@/components/dashboardContent/ContentList";
import Dashboard from "@/components/dashboardContent/Dashboard";
import DashboardContentAdd from "@/components/dashboardContent/DashboardContentAdd";
import Settings from "@/components/dashboardContent/Settings";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { NextPageWithLayout } from "@/utils/types";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";

const DashboardAction: NextPageWithLayout = () => {
  const router = useRouter();
  const [content, setContent] = useState(<Dashboard />);
  const { action } = router.query;

  useEffect(() => {
    switch (action) {
      case "content":
        setContent(<ContentList />);
        break;

      case "settings":
        setContent(<Settings />);
        break;

      case "add":
        setContent(<DashboardContentAdd />);
        break;
    }
  }, [action]);

  return content;
};

DashboardAction.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardAction;
