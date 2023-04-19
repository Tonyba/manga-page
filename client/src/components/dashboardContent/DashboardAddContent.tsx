import React, { useEffect, useState } from "react";
import AddContentForm from "../forms/AddContentForm";
import { ContentValidationType, DataState } from "@/utils/types";
import { demography, status, types } from "@/utils/valoresParaSelect";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import { ValidateContent } from "@/utils/validations/ContentAddValidation";

const initState: DataState = {
  banner: "",
  demography: demography[0].label,
  description: "",
  genres: [],
  status: status[0].label,
  title: "",
  type: types[0].label,
  image: "",
};

const DashboardAddContent = () => {
  const [data, setData] = useState<DataState>(initState);
  const [errors, setErrors] = useState<ContentValidationType>();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(ValidateContent(data));
  };

  const saveContent = () => {
    console.log(data);
    console.log("save");
  };

  useEffect(() => {
    if (errors && submitting) {
      if (Object.keys(errors).length !== 0) {
        console.log("errors");
      } else {
        saveContent();
      }
      setSubmitting(false);
    }
  }, [JSON.stringify(errors), submitting]);
  return (
    <>
      <div className="flex items-center gap-3">
        <Link
          href={"/dashboard/content"}
          role="button"
          className="bg-primary bg-primary-dark-hover rounded-full p-3"
        >
          <FaTimes size={25} />
        </Link>
        <h1 className="font-semibold text-3xl">Agregar Contenido</h1>
      </div>

      <div className="py-5 w-full">
        <AddContentForm
          data={data}
          setData={setData}
          onSubmit={handleSubmit}
          errors={errors}
        />
      </div>
    </>
  );
};

export default DashboardAddContent;
