import React, { useEffect, useState } from "react";
import Input from "./Input";
import TextArea from "./TextArea";

import { demography, status, types } from "@/utils/valoresParaSelect";
import FormSelect from "./FormSelect";
import { OptionType } from "@/utils/types";
import { genres } from "@/utils/valoresParaSelect";
import DragAndDrop from "./DragAndDrop";

type dataState = {
  title: string;
  description: string;
  type: string;
  demography: string;
  genres: any[];
  status: string;
};

const AddContentForm = () => {
  const [data, setData] = useState<dataState>({
    title: "",
    description: "",
    type: types[0].label,
    demography: demography[0].label,
    genres: [],
    status: "",
  });

  useEffect(() => {
    console.log(data);
  }, [data.genres.length]);

  const handleChange = (opt: OptionType[]) => {
    setData({ ...data, genres: opt });
  };

  const handleBannerChange = () => {};

  return (
    <form className="flex flex-col gap-3">
      <DragAndDrop name="banner" onChange={handleBannerChange} />
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
    </form>
  );
};

export default AddContentForm;
