import React from "react";
import DragAndDrop from "./DragAndDrop";

const AddChapterForm = () => {
  const uploadImages = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={(e) => uploadImages(e)}>
      <DragAndDrop
        name="imagenes-capitulo"
        onChange={() => {}}
        isMulti={true}
      />

      <button
        className="w-max p-2 button-primary rounded-xl 
          font-semibold mt-3 flex gap-3 items-center disabled:cursor-not-allowed"
        type="submit"
      >
        Subir Imagenes
      </button>
    </form>
  );
};

type Props = {
  preview: string;
};

export default AddChapterForm;
