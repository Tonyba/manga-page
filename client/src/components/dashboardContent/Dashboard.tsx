import { getDashboardData } from "@/utils/axios/contentType";
import { INIT_DASHBOARD_DATA } from "@/utils/constants";
import { DashboardData } from "@/utils/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Dashboard = () => {

  const [data, setData] = useState<DashboardData>(INIT_DASHBOARD_DATA);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardData();

        const data = res.data;
        console.log(data)
        setData(data);

      } catch (error) {
        console.log(error)
      }
      

    }

    fetchData();
  }, []);

  return <>
   <h1 className="font-semibold text-3xl">Resumen</h1>
   <div className="grid xl:grid-cols-3 gap-10 my-5">
        <div className="bg-manga p-5 rounded-md flex justify-between">
          <h2 className="text-xl font-semibold" >Mangas</h2>
          <span className="font-semibold" >{data.mangasCount}</span>
        </div>
        <div className="bg-manwha p-5 rounded-md flex justify-between" >
          <h2 className="text-xl font-semibold" >Manhwas</h2>
          <span className="font-semibold" >{data.manhwasCount}</span>
        </div>
        <div className="bg-manhua p-5 rounded-md flex justify-between">
          <h2 className="text-xl font-semibold" >Manhuas</h2>
          <span className="font-semibold" >{data.manhuasCount}</span>
        </div>
   </div>
   <div className="grid xl:grid-cols-2">
    <div className="bg-primary p-5 rounded-md" >
      <h2 className="font-semibold text-lg">Ultimas Series Subidas</h2>
      <div className="">
        { data.lastAddedMangas.map((item) =>  
        <>
          <div key={item.id}> 
            <Link href={`/content/${item.id}`}>{item.title}</Link>
          </div>
        </> ) }
       
      </div>
    </div>
  
   </div>
  </>;
};

export default Dashboard;
