import React, { useCallback, useEffect, useState } from "react";
import AddContentForm from "../forms/AddContentForm";
import { ContentValidationType, AddContentParams } from "@/utils/types";
import { demography, status, types, genres } from "@/utils/valoresParaSelect";

import { ValidateContent } from "@/utils/validations/ContentAddValidation";
import Swal from "sweetalert2";
import { addContent, getManga, updateContent } from "@/utils/axios/contentType";
import DashboardTitle from "./DashboardTitle";
import { useSearchParams } from 'next/navigation';
import { revalidateManga } from "@/utils/axios/revalidate";

const initState: AddContentParams = {
  banner: "",
  demography: demography[0],
  description: "",
  genres: [],
  status: status[0],
  title: "",
  type: types[0],
  image: "",
};

const DashboardAddContent = () => {

  const searchParams = useSearchParams();

  const id = searchParams.get('contentId');  

  const [data, setData] = useState<AddContentParams>(initState);
  const [errors, setErrors] = useState<ContentValidationType>();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(ValidateContent(data));
  };

  const editContent = () => {
    updateContent(data, parseInt(id!))
      .then(async (res) => {
        console.log(res);
        await revalidateManga(id as string);
        setSubmitting(false);
        Swal.fire(`${data.type?.label} actualizado`, "", "success");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire(`Error al actualizar ${data.type?.label}`, "", "error");
        setSubmitting(false);
      });
  };

  const saveContent = () => {
    addContent(data)
      .then((res) => {
        console.log(res);
        setSubmitting(false);
        Swal.fire(`${data.type?.label} creado`, "", "success");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire(`Error al crear ${data.type?.label}`, "", "error");
        setSubmitting(false);
      });
  };

  const fetchData = useCallback( async () => {
    const resp = await getManga( parseInt(id!) );
    const data = resp.data;

    const parsed = {
      ...data.manga,
      image: data.manga.image as string,
      banner: data.manga.banner as string,
      type: types.find( (v) => v.label ===  data.manga.type),
      demography: demography.find((d) => d.label === data.manga.demography),
      status: status.find((s) => s.label === data.manga.status),
      genres: genres.filter((s) => data.manga.genres.includes(s.label)  )
    }



    setData(parsed);

  }, [id]);

  useEffect(() => {
    if(id) {
      fetchData();  
    }
  }, [id]);

  useEffect(() => {
    if (errors && submitting) {
      if (Object.keys(errors).length !== 0) {
        console.log("errors");
        Swal.fire("Hay errores en el formulario", "", "error");
        setSubmitting(false);
      } else {
        
       id ? editContent() : saveContent();

      }
    }
  }, [JSON.stringify(errors), submitting, id]);
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
          editing={id ? true : false}
        />
      </div>
    </>
  );
};

export default DashboardAddContent;
