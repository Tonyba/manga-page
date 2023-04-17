import Link from "next/link";
import React from "react";
import { FaTimes } from "react-icons/fa";
import AddContentForm from "../forms/AddContentForm";

function DashboardContentAdd() {
  const onSubmit = () => {};

  return (
    <>
      <div className="flex items-center gap-3">
        <Link
          href={"/dashboard/content"}
          role="button"
          className="bg-primary rounded-full p-3"
        >
          <FaTimes size={24} />
        </Link>
        <h1 className="font-semibold text-3xl">Añadir Contenido</h1>
      </div>
      <div className="flex py-5">
        <div className="w-3/4">
          <AddContentForm onSubmit={onSubmit} />
        </div>
        <div className="w-1/4">gfewf</div>
      </div>
    </>
  );
}

export default DashboardContentAdd;
