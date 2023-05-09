import Image from "next/image";
import React, { FC } from "react";
import ContentPill from "../content/ContentPill";
import DashboardHoverItem from "./DashboardHoverItem";
import { FaTrash, FaPencilAlt, FaPlus } from "react-icons/fa";
import { ContentType } from "@/utils/types";

export const DashboardListItem: FC<ContentType> = ({
  title,
  id,
  type,
  image,
  description,
  status,
  demography,
}) => {
  const handleDelete = () => {};

  return (
    <tr className="[&>*]:py-3 align-top bg-primary-dark-hover group">
      <td className="pl-2 pr-4 w-[32px]">
        <input type="checkbox" />
      </td>

      <td className="pl-2 pr-4 max-w-xl ">
        <div className="flex gap-5 items-start">
          <Image
            src={image as string}
            alt={title}
            className="rounded-sm"
            priority={true}
            width={120}
            height={68}
          />

          <div>
            <span>{title}</span>
            <p className="text-sm font-light text-dark group-hover:hidden">
              {description}
            </p>
            <div className="gap-3 hidden group-hover:flex mt-3">
              <DashboardHoverItem
                link={`/dashboard/edit?contentId=${id}`}
                textHover="Editar"
              >
                <FaPencilAlt size={18} />
              </DashboardHoverItem>
              <DashboardHoverItem onClick={handleDelete} textHover="Borrar">
                <FaTrash size={18} />
              </DashboardHoverItem>
              <DashboardHoverItem
                textHover="Agregar Capitulo"
                link={`/dashboard/add-chapter?contentId=${id}`}
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
        <ContentPill contentType={type} isAbsolute={false} />
      </td>

      <td className="pl-2 pr-4 text-sm">{status}</td>
      <td className="pl-2 pr-4 text-sm">{demography}</td>

      <td className="pl-2 pr-4">1230</td>

      <td className="pl-2 pr-4">1242145</td>
    </tr>
  );
};
