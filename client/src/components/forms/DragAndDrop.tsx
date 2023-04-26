import { fileTypes } from "@/utils/helpers";
import React, { FC, useEffect, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import ValidationError from "./ValidationError";
import ChapterImagesPreviews from "../dashboardContent/ChapterImagesPreviews";
import { AddChapterContext } from "@/utils/context/AddChapterContext";
import Dropzone from "react-dropzone";
import { DragImageItemType } from "@/utils/types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
  const [filesItem, setFilesItems] = useState<DragImageItemType[]>([]);

  const handlePreview = (files: File[] | File) => {
    if (!Array.isArray(files) && files instanceof Blob) files = [files];

    let selectedFilesArray = Array.from(files);
    let fileItemArr: DragImageItemType[] = selectedFilesArray.map(
      (selected, i) => ({
        id: "img-" + (filesItem.length + i),
        file: selected,
        imgSrc: URL.createObjectURL(selected),
        pag: filesItem.length + i,
      })
    );

    if (isMulti) {
      fileItemArr = [...filesItem].concat(fileItemArr);
    }

    setFilesItems(fileItemArr);
  };

  const onRemoveImage = (index: number) => {
    const newImages = filesItem.filter((prev, i) => i !== index ?? prev);

    let fileItemArr: DragImageItemType[] = newImages.map((selected, i) => ({
      id: "img-" + i,
      file: selected.file,
      imgSrc: URL.createObjectURL(selected.file),
      pag: i,
    }));

    setFilesItems(fileItemArr);
  };

  const handleDrop = (acceptedFiles: File[]) => {
    handlePreview(acceptedFiles);
  };

  useEffect(() => {
    onChange(filesItem.map((f) => f.file));

    return () =>
      filesItem.forEach((preview) => URL.revokeObjectURL(preview.imgSrc));
  }, [filesItem]);

  return (
    <div className="mb-4">
      {label && <label htmlFor="">{label}</label>}

      <Dropzone onDrop={handleDrop} multiple={isMulti} accept={fileTypes}>
        {({ getRootProps, getInputProps }) => (
          <div
            className="py-4 flex items-center justify-center gap-3 border-dashed border-2 border-important cursor-pointer mt-3"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {filesItem.length > 0 && !isMulti ? (
              !isMulti &&
              filesItem.map((prev, i) => <img key={i} src={prev.imgSrc} />)
            ) : (
              <div className="flex items-center flex-col py-4 h-full w-full">
                <RiImageAddFill className="mb-3" size={50} />
                <span className="font-semibold text-2xl">
                  Arrasta una imagen aca!
                </span>
              </div>
            )}
          </div>
        )}
      </Dropzone>

      {errMsg && <ValidationError errorMessage={errMsg} />}

      {isMulti && filesItem.length > 0 && (
        <DndProvider backend={HTML5Backend}>
          <AddChapterContext.Provider
            value={{
              fileItems: filesItem,
              setFileItems: setFilesItems,
              onRemoveImage: onRemoveImage,
            }}
          >
            <ChapterImagesPreviews />
          </AddChapterContext.Provider>
        </DndProvider>
      )}
    </div>
  );
};

export default DragAndDrop;