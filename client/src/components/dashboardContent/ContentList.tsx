import React, { useEffect, useState } from "react";
import { DashboardListItem } from "./DashboardListItem";
import Link from "next/link";
import { ContentType } from "@/utils/types";
import { getMangas } from "@/utils/axios/contentType";

const ContentList = () => {
  const [content, setContent] = useState<ContentType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMangas();
      const data = res.data;

      setContent(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex items-center gap-3 mb-5">
        <h1 className="font-semibold text-3xl">Contenido</h1>
        <Link
          href={"/dashboard/add"}
          role="button"
          className="text-important button-primary-outline text-sm border border-button p-2 py-1 rounded-sm"
        >
          Agregar
        </Link>
      </div>

      <div className="grid grid-cols-1 ">
        <table className="divide-y divider-primary">
          <thead>
            <tr className="[&>*]:font-normal [&>*]:text-left [&>*]:py-3">
              <th className="pl-2 pr-4">
                <input type="checkbox" />
              </th>
              <th className="pl-2 pr-4">Contenido</th>
              <th className="pl-2 pr-4">Capitulos</th>
              <th className="pl-2 pr-4">Fecha</th>
              <th className="pl-2 pr-4">Tipo</th>
              <th className="pl-2 pr-4">Comentarios</th>
              <th className="pl-2 pr-4">Vistas</th>
            </tr>
          </thead>
          <tbody className="divide-y divider-primary ">
            {content.map((c) => <DashboardListItem {...c} />)}
  
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ContentList;
