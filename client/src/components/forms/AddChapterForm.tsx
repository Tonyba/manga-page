import React, { useState } from "react";
import DragAndDrop from "./DragAndDrop";

const AddChapterForm = () => {
  const [file, setFiles] = useState<File[]>([]);

  const uploadImages = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(file);
  };

  const handleFileChange = (files: File[]) => {
    console.log(files, "form");
    setFiles(files);
  };

  return (
    <form onSubmit={(e) => uploadImages(e)}>
      <DragAndDrop
        name="imagenes-capitulo"
        onChange={handleFileChange}
        isMulti={true}
      />
      <div className="mb-10">
        <button
          className="w-max p-2 button-primary rounded-xl 
          font-semibold mt-3 flex gap-3 items-center disabled:cursor-not-allowed "
          type="submit"
        >
          Subir Imagenes
        </button>
      </div>
    </form>
  );
};

type Props = {
  preview: string;
};

export default AddChapterForm;
