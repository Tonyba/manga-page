import React, { FC, useEffect, useState } from "react";
import Input from "./Input";
import TextArea from "./TextArea";

import { demography, status, types } from "@/utils/valoresParaSelect";
import FormSelect from "./FormSelect";
import { DataState, OptionType } from "@/utils/types";
import { genres } from "@/utils/valoresParaSelect";
import DragAndDrop from "./DragAndDrop";

type Props = {
  data: DataState;
  setData: (data: DataState) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const AddContentForm: FC<Props> = ({ data, setData, onSubmit }) => {
  useEffect(() => {
    console.log(data);
  }, [data.genres.length]);

  const handleChange = (opt: OptionType[]) => {
    setData({ ...data, genres: opt });
  };

  const handleBannerChange = (file: File, imageType: "banner" | "image") => {
    setData({ ...data, [imageType]: file });
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className="flex w-full">
      <div className="w-3/4 flex-col flex gap-3">
        <DragAndDrop
          name="banner"
          onChange={(f) => handleBannerChange(f, "banner")}
          label="Banner"
        />
        <div className="mt-3"></div>
        <Input
          label="Titulo"
          placeholder="Escriba un titulo"
          onChange={(title) => setData({ ...data, title })}
          value={data.title}
        />
        <TextArea
          label="Descripcion"
          placeholder="Escribe una Descripcion"
          onChange={(description) => setData({ ...data, description })}
          value={data.description}
        />
        <div className="flex gap-3">
          <div className="w-1/3">
            <FormSelect
              placeholder="Seleccione un Tipo"
              label="Tipos"
              onChange={(opt) => setData({ ...data, type: opt.label })}
              options={types}
              defaultValue={types[0]}
            />
          </div>
          <div className="w-1/3">
            <FormSelect
              placeholder="Seleccione una Demografia"
              label="Demografia"
              onChange={(opt) => setData({ ...data, demography: opt.label })}
              options={demography}
              defaultValue={demography[0]}
            />
          </div>

          <div className="w-1/3">
            <FormSelect
              placeholder="Seleccione un Estado"
              label="Estado"
              onChange={(opt) => setData({ ...data, status: opt.label })}
              options={status}
              defaultValue={status[0]}
            />
          </div>
        </div>
        <div>
          <FormSelect
            placeholder="Seleccione Generos"
            label="Generos"
            isMulti={true}
            onChange={(opt) => handleChange(opt)}
            options={genres}
            defaultValue={data.genres}
          />
        </div>

        <button
          className="w-20 p-2 button-primary rounded-xl font-semibold mt-3"
          type="submit"
        >
          Crear
        </button>
      </div>

      <div className="w-1/4 px-7">
        <DragAndDrop
          name="Image"
          onChange={(f) => handleBannerChange(f, "image")}
          label="Imagen"
        />
      </div>
    </form>
  );
};

export default AddContentForm;
