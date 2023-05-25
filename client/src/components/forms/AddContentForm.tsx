import React, { FC } from "react";
import Input from "./Input";
import TextArea from "./TextArea";

import { demography, status, types } from "@/utils/valoresParaSelect";
import FormSelect from "./FormSelect";
import {
  ContentValidationType,
  AddContentParams,
  OptionType,
} from "@/utils/types";
import { genres } from "@/utils/valoresParaSelect";
import DragAndDrop from "./DragAndDrop";
import SubmitButton from "./SubmitButton";

type Props = {
  data: AddContentParams;
  setData: (data: AddContentParams) => void;
  onSubmit: (e: React.FormEvent) => void;
  errors?: ContentValidationType;
  loading: boolean;
};

const AddContentForm: FC<Props> = ({
  data,
  setData,
  onSubmit,
  errors,
  loading,
}) => {
  const handleBannerChange = (file: File, imageType: "banner" | "image") => {
    setData({ ...data, [imageType]: file });
  };

  const handlePush = (elems: OptionType[], type: string) => {
    const values: string[] = [];
    elems.forEach((elem) => {
      values.push(elem.label);
    });

    setData({ ...data, [type]: values });
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="flex w-full flex-wrap-reverse xl:flex-wrap"
    >
      <div className="w-full xl:w-3/4 flex-col flex gap-3 ">
        <DragAndDrop
          name="banner"
          onChange={(f) => handleBannerChange(f[0], "banner")}
          label="Banner"
          errMsg={errors?.banner as string}
        />
        <div className="mt-10"></div>
        <Input
          label="Titulo"
          placeholder="Escriba un titulo"
          onChange={(title) => setData({ ...data, title })}
          value={data.title}
          errMsg={errors?.title}
        />
        <TextArea
          label="Descripcion"
          placeholder="Escribe una Descripcion"
          onChange={(description) => setData({ ...data, description })}
          value={data.description}
          errMsg={errors?.description}
        />
        <div className="flex gap-3">
          <div className="w-1/3">
            <FormSelect
              placeholder="Seleccione un Tipo"
              label="Tipo"
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
            onChange={(opt) => handlePush(opt, "genres")}
            options={genres}
            defaultValue={data.genres}
            errMsg={errors?.genres as any[]}
          />
        </div>

        <SubmitButton text="crear" loading={loading} />
      </div>

      <div className="w-full xl:w-1/4 xl:pl-7">
        <DragAndDrop
          name="Image"
          onChange={(f) => handleBannerChange(f[0], "image")}
          label="Imagen"
          errMsg={errors?.image as string}
        />
      </div>
    </form>
  );
};

export default AddContentForm;
