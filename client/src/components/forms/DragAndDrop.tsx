import { fileTypes } from "@/utils/helpers";
import React, { FC, useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { RiImageAddFill } from "react-icons/ri";
import ValidationError from "./ValidationError";

type Props = {
  onChange: (file: File) => void;
  name: string;
  required?: boolean;
  label: string;
  errMsg?: string;
};

const DragAndDrop: FC<Props> = ({
  onChange,
  name,
  required = false,
  label,
  errMsg,
}) => {
  const [preview, setPreview] = useState<string>();
  const handlePreview = (f: File) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result?.toString());
    };

    reader.readAsDataURL(f);
  };

  return (
    <div className="mb-4">
      <label className="mb-2 block" htmlFor="">
        {label}
      </label>
      <FileUploader
        name={name}
        types={fileTypes}
        handleChange={(f: File) => {
          onChange(f);
          handlePreview(f);
        }}
        classes="cursor-pointer"
        required={required}
        multiple={false}
        label={label}
        children={
          <div className="border  py-4 h-full border-dashed border-2 border-important flex flex-col items-center justify-center">
            {preview ? (
              <img src={preview} />
            ) : (
              <>
                <RiImageAddFill className="mb-3" size={50} />
                <span className="font-semibold text-2xl">
                  Arrasta una imagen aca!
                </span>
              </>
            )}
          </div>
        }
      />
      {errMsg && <ValidationError errorMessage={errMsg} />}
    </div>
  );
};

export default DragAndDrop;
