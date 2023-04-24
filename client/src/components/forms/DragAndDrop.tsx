import { fileTypes } from "@/utils/helpers";
import React, { FC, useEffect, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import ValidationError from "./ValidationError";
import ChapterImagesPreviews from "../dashboardContent/ChapterImagesPreviews";
import { AddChapterContext } from "@/utils/context/AddChapterContext";
import Dropzone from "react-dropzone";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { DragImageItemType } from "@/utils/types";

type Props = {
  onChange: (file: File[]) => void;
  name: string;
  required?: boolean;
  label?: string;
  errMsg?: string;
  isMulti?: boolean;
};

const DragAndDrop: FC<Props> = ({
  onChange,
  name,
  required = false,
  label,
  errMsg,
  isMulti = false,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [filesItem, setFilesItems] = useState<DragImageItemType[]>([]);
  const [filesToUpload, setFiles] = useState<File[]>([]);
 
  const handlePreview = (files: File[] | File) => {
    if (!Array.isArray(files) && files instanceof Blob) files = [files];

    let selectedFilesArray = Array.from(files);
    let fileItemArr:DragImageItemType[] = selectedFilesArray.map((selected, i) => ({
      id: 'img-'+i,
      file: selected
    }));


    const imagesArray = fileItemArr.map((f) => {
      return URL.createObjectURL(f.file);
    });

    let comb: string[] = [imagesArray[0]];

    if (isMulti) {
      comb = [...previews].concat(imagesArray);
      selectedFilesArray = [...filesToUpload].concat(files);
    }

    setFilesItems(fileItemArr);
    setFiles(selectedFilesArray);
    setPreviews(comb);
  };

  const onRemoveImage = (index: number) => {
    const newImages = filesToUpload.filter((prev, i) => i !== index ?? prev);

    const imagesPreview = newImages.map((f) => {
      return URL.createObjectURL(f);
    });

    console.log(newImages, "files");
    console.log(imagesPreview, "previews");

    setFiles(newImages);
    setPreviews(imagesPreview);
  };

  const onImageReOrder = (index: number, toIndex: number) => {
    const newImages = [...filesToUpload].splice(
      toIndex,
      0,
      [...filesToUpload].splice(index, 1)[0]
    );
  };

  const handleDrop = (acceptedFiles: File[]) => {
    handlePreview(acceptedFiles);
  };

  useEffect(() => {
    console.log(filesToUpload, "after");
    onChange(filesToUpload);

    return () => previews.forEach((preview) => URL.revokeObjectURL(preview));
  }, [filesToUpload]);

  return (
    <div className="mb-4">
      {label && <label htmlFor="">{label}</label>}

      <Dropzone
        onDrop={handleDrop}
        multiple={isMulti}
        accept={fileTypes}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            className="py-4 flex items-center justify-center gap-3 border-dashed border-2 border-important cursor-pointer mt-3"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {previews.length > 0 && !isMulti ? (
              !isMulti && previews.map((prev, i) => <img key={i} src={prev} />)
            ) : (
              <div className="flex items-center flex-col    py-4 h-full w-full">
                <RiImageAddFill className="mb-3" size={50} />
                <span className="font-semibold text-2xl">
                  Arrasta una imagen aca!
                </span>
              </div>
            )}
          </div>
        )}
      </Dropzone>

      {isMulti && previews.length > 0 && (
        <DndProvider backend={HTML5Backend}>
          <AddChapterContext.Provider
            value={{
              onRemoveImage,
              onImageReOrder,
              previews,
              setPreviews,
              setFiles,
              files: filesToUpload,
              fileItems: filesItem,
              setFileItems: setFilesItems
            }}
          >
            <ChapterImagesPreviews />
          </AddChapterContext.Provider>
        </DndProvider>
      )}
      {errMsg && <ValidationError errorMessage={errMsg} />}
    </div>
  );
};

export default DragAndDrop;
