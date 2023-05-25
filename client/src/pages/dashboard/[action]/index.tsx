import LoadingSpinner from "@/components/chapter/LoadingSpinner";
import ContentList from "@/components/dashboardContent/ContentList";
import DashboardAddChapter from "@/components/dashboardContent/DashboardAddChapter";
import DashboardAddContent from "@/components/dashboardContent/DashboardAddContent";
import DashboardFavorites from "@/components/dashboardContent/DashboardFavorites";
import Settings from "@/components/dashboardContent/Settings";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { NextPageWithLayout } from "@/utils/types";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";

const DashboardAction: NextPageWithLayout = () => {
  const router = useRouter();
  const [content, setContent] = useState(
    <div className="flex justify-center items-center mt-64">
      <LoadingSpinner />
    </div>
  );
  const { action } = router.query;

  useEffect(() => {
    switch (action) {
      case "content":
        setContent(<ContentList />);
        break;

      case "settings":
        setContent(<Settings />);
        break;

      case "favorites":
        setContent(<DashboardFavorites />);
        break;

      case "add":
        setContent(<DashboardAddContent />);
        break;

      case "add-chapter":
        setContent(<DashboardAddChapter />);
        break;
    }
  }, [action]);

  return content;
};

DashboardAction.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardAction;
