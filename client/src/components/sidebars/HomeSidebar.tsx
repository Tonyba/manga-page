import React, { useEffect, useState } from "react";
import AdComponent from "../Ad/AdComponent";
import Tabs from "../Tabs/Tabs";
import { TabItemType } from "@/utils/types";
//import { faker } from "@faker-js/faker";
import CardLoop from "../cardLoop/cardLoop";
import { filterExp } from "@/utils/axios/filters";
import { INIT_FILTER_STATE } from "@/utils/constants";

export const HomeSidebar = () => {
  const [tabs, setTabs] = useState<TabItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTabsData = async () => {
    const mangasRes = await filterExp({
      ...INIT_FILTER_STATE,
      type: "Manga",
      limit: 6,
      page: 1,
    });
    const manwhaRes = await filterExp({
      ...INIT_FILTER_STATE,
      type: "Manhwa",
      limit: 6,
      page: 1,
    });
    const manhuaRes = await filterExp({
      ...INIT_FILTER_STATE,
      type: "Manhua",
      limit: 6,
      page: 1,
    });

    const mangas = mangasRes.data.result;
    const manwhas = manwhaRes.data.result;
    const manhuas = manhuaRes.data.result;

    const contentTabs: TabItemType[] = [
      {
        label: "Manga",
        content: <CardLoop items={mangas} itemType="list" oneCol={true} />,
      },
      {
        label: "Manhwa",
        content: <CardLoop items={manwhas} itemType="list" oneCol={true} />,
      },
      {
        label: "Manhua",
        content: <CardLoop items={manhuas} itemType="list" oneCol={true} />,
      },
    ];

    setTabs(contentTabs);
    setLoading(false);
  };

  useEffect(() => {
    fetchTabsData();
  }, []);

  return (
    <>
      <AdComponent />

      <div className="sticky top-3">
        <h3 className="my-5 text-2xl font-semibold text-center">
          Recomendaciones
        </h3>

        <Tabs tabs={tabs} loading={loading} />
      </div>
    </>
  );
};
