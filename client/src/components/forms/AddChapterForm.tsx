import React, { FC } from "react";
import DragAndDrop from "./DragAndDrop";
import { CreateChapterParams } from "@/utils/types";
import Input from "./Input";
import { ChapterValidationType } from "@/utils/types";
import SubmitButton from "./SubmitButton";

type Props = {
  data: CreateChapterParams;
  setData: (data: CreateChapterParams) => void;
  onSubmit: (e: React.FormEvent) => void;
  errors?: ChapterValidationType;
  loading: boolean;
  clearForm?: boolean;
  setClearForm?: (clear: boolean) => void
};

const AddChapterForm: FC<Props> = ({
  onSubmit,
  errors,
  setData,
  data,
  loading,
  clearForm,
  setClearForm,
}) => {
  const handleFileChange = (files: File[]) => {
    setData({ ...data, images: files });
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Input
        type="number"
        label="Numero del Capitulo"
        onChange={(e) => setData({ ...data, capNumber: parseInt(e) })}
        placeholder="Escriba el numero del capitulo"
        value={data.capNumber}
        errMsg={errors?.capNumber}
      />
      <DragAndDrop
        name="imagenes-capitulo"
        onChange={handleFileChange}
        isMulti={true}
        errMsg={errors?.images}
        clearForm={clearForm}
        setClearForm={setClearForm}
      />
      <div className="mb-10">
        <SubmitButton loading={loading} text="Subir Capitulo" />
      </div>
    </form>
  );
};

export default AddChapterForm;
