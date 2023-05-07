import React, { useEffect, useState } from "react";
import AddContentForm from "../forms/AddContentForm";
import { ContentValidationType, AddContentParams } from "@/utils/types";
import { demography, status, types } from "@/utils/valoresParaSelect";

import { ValidateContent } from "@/utils/validations/ContentAddValidation";
import Swal from "sweetalert2";
import { addContent } from "@/utils/axios/contentType";
import DashboardTitle from "./DashboardTitle";

const initState: AddContentParams = {
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
  const [data, setData] = useState<AddContentParams>(initState);
  const [errors, setErrors] = useState<ContentValidationType>();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(ValidateContent(data));
  };

  const saveContent = () => {
    addContent(data).then((res) => {
      console.log(res);
      setSubmitting(false);
      Swal.fire(`${data.type} creado`, "", "success");
    });
  };

  useEffect(() => {
    if (errors && submitting) {
      if (Object.keys(errors).length !== 0) {
        console.log("errors");
        Swal.fire("Hay errores en el formulario", "", "error");
      } else {
        saveContent();
      }
    }
  }, [JSON.stringify(errors), submitting]);
  return (
    <>
      <DashboardTitle text="Agregar Contenido" />

      <div className="py-5 w-full">
        <AddContentForm
          data={data}
          setData={setData}
          onSubmit={handleSubmit}
          errors={errors}
          loading={submitting}
        />
      </div>
    </>
  );
};

export default DashboardAddContent;
