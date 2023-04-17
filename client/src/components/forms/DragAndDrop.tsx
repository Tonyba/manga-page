import { fileTypes } from "@/utils/helpers";
import React, { FC } from "react";
import { FileUploader } from "react-drag-drop-files";

type Props = {
  onChange: (file: File) => void;
  name: string;
  required?: boolean;
};

const DragAndDrop: FC<Props> = ({ onChange, name, required = false }) => {
  return (
    <FileUploader
      name={name}
      types={fileTypes}
      classes=""
      handleChange={(f: File) => onChange(f)}
      required={true}
      multiple={false}
      label="Arrastra una imagen aqui"
      children={<>fgewgweg</>}
    />
  );
};

export default DragAndDrop;
