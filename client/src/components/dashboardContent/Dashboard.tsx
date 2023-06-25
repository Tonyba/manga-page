import { getDashboardData } from "@/utils/axios/contentType";
import { INIT_DASHBOARD_DATA } from "@/utils/constants";
import { DashboardData } from "@/utils/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MangaCountItem from "./dashboardAdminComponents/MangaCountItem";
import ContentPill from "../content/ContentPill";
import ScrollbarBox from "../scrollbarBox/ScrollbarBox";

const Dashboard = () => {
  const [data, setData] = useState<DashboardData>(INIT_DASHBOARD_DATA);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardData();

        const data = res.data;
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="font-semibold text-3xl">Resumen</h1>
      <div className="grid md:grid-cols-3 gap-10 my-5">
        <MangaCountItem count={data.mangasCount} type="Manga" />
        <MangaCountItem count={data.manhwasCount} type="Manhwa" />
        <MangaCountItem count={data.manhuasCount} type="Manhua" />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-primary p-5 rounded-md">
          <h2 className="font-semibold text-xl mb-3 ">
            Ultimas Series Subidas
          </h2>
          <ScrollbarBox>
            <div className="grid divide-y divider-dark max-h-96">
              {data.lastAddedMangas.map((item) => (
                <Link
                  key={item.id}
                  className="font-medium text-lg items-center flex gap-3 py-5 bg-hover rounded-2xl px-3"
                  href={`/content/${item.id}`}
                >
                  {item.title}
                  <ContentPill contentType={item.type} isAbsolute={false} />
                </Link>
              ))}
            </div>
          </ScrollbarBox>
        </div>

        <div className="bg-primary p-5 rounded-md">
          <h2 className="font-semibold text-xl  mb-3">
            Ultimas Capitulos Subidos
          </h2>

          <ScrollbarBox>
            <div className="grid divide-y divider-dark max-h-96">
              {data.lastAddedChapters.map((item) => (
                <Link
                  key={item.id}
                  className="font-medium text-lg items-center flex gap-3 py-5 bg-hover rounded-2xl px-3"
                  href={`/content/${item.Manga?.id}/capitulo-${item.capNumber}`}
                >
                  {item.Manga?.title} - {item.title}
                </Link>
              ))}
            </div>
          </ScrollbarBox>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
