
import React, { FC, useContext } from "react";
import DragAndDrop from "./DragAndDrop";
import { CreateChapterParams, ImageType } from "@/utils/types";
import Input from "./Input";
import { ChapterValidationType } from "@/utils/types";
import SubmitButton from "./SubmitButton";
import ViewChapterFilterContext from "@/utils/context/ChapterFilterContext";

type Props = {
  data: CreateChapterParams;
  setData: (data: CreateChapterParams) => void;
  onSubmit: (e: React.FormEvent) => void;
  errors?: ChapterValidationType;
  loading: boolean;
  clearForm?: boolean;
  setClearForm?: (clear: boolean) => void;
  editing: boolean
};

const AddChapterForm: FC<Props> = ({
  onSubmit,
  errors,
  setData,
  data,
  loading,
  clearForm,
  setClearForm,
  editing
}) => {
  const handleFileChange = (files: ImageType[]) => {
    setData({ ...data, images: files });
  };

  const { editingChapter } = useContext(ViewChapterFilterContext);

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Input
        type="number"
        label="Numero del Capitulo"
        onChange={(e) => setData({ ...data, capNumber: parseInt(e) })}
        placeholder="Escriba el numero del capitulo"
        value={data.capNumber}
        errMsg={errors?.capNumber}
        readOnly={editing}
      />

      <DragAndDrop
        name="imagenes-capitulo"
        onChange={handleFileChange}
        isMulti={true}
        errMsg={errors?.images}
        clearForm={clearForm}
        setClearForm={setClearForm}
        previews={ editing ? editingChapter?.images : []}
      />
      <div className="mb-10">
        <SubmitButton loading={loading} text={`${editing ? 'Actualizar' : 'Subir'} Capitulo`} />
      </div>
    </form>
  );
};

export default AddChapterForm;
