import Image from "next/image";
import React from "react";
import ContentPill from "../content/ContentPill";
import DashboardHoverItem from "./DashboardHoverItem";
import { FaTrash, FaPencilAlt, FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";

export const DashboardListItem = () => {
  const router = useRouter();

  const handleDelete = () => {};

  return (
    <tr className="[&>*]:py-3 align-top bg-primary-dark-hover group">
      <td className="pl-2 pr-4 w-[32px]">
        <input type="checkbox" />
      </td>

      <td className="pl-2 pr-4 max-w-xl ">
        <div className="flex gap-5 items-start">
          <Image
            src={"https://picsum.photos/120/68"}
            alt="item"
            className="rounded-sm"
            width={120}
            height={68}
          />

          <div>
            <span>
              Kmzekett Damasare Uragirarete Shokei Sareta Watashi Ga… Dare wo
              Shinji Rareru To iu Nodesho
            </span>
            <p className="text-sm font-light text-dark group-hover:hidden">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptate laborum, quam, eos perspiciatis at quaerat a fugiat
              beatae fuga veritatis nemo dolores eius minima ab debitis pariatur
              tempore officiis vero!
            </p>
            <div className="gap-3 hidden group-hover:flex mt-3">
              <DashboardHoverItem
                link={`/dashboard/edit?contentId=${22}`}
                textHover="Editar"
              >
                <FaPencilAlt size={18} />
              </DashboardHoverItem>
              <DashboardHoverItem onClick={handleDelete} textHover="Borrar">
                <FaTrash size={18} />
              </DashboardHoverItem>
              <DashboardHoverItem
                textHover="Agregar Capitulo"
                link={`/dashboard/add-chapter?contentId=${22}`}
              >
                <FaPlus size={18} />
              </DashboardHoverItem>
            </div>
          </div>
        </div>
      </td>

      <td className="pl-2 pr-4 text-sm">100</td>

      <td className="pl-2 pr-4 text-sm">12/04/2023</td>

      <td className="pl-2 pr-4 text-sm">
        <ContentPill contentType="manga" isAbsolute={false} />
      </td>

      <td className="pl-2 pr-4">1230</td>

      <td className="pl-2 pr-4">1242145</td>
    </tr>
  );
};
