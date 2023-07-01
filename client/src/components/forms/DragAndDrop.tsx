import React, { FC, useContext, useEffect, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import ValidationError from "./ValidationError";
import ChapterImagesPreviews from "../dashboardContent/ChapterImagesPreviews";
import { AddChapterContext } from "@/utils/context/AddChapterContext";
import Dropzone from "react-dropzone";
import { ImageType } from "@/utils/types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FILE_TYPES } from "@/utils/constants";
import { isType } from "@/utils/helpers";
import ViewChapterFilterContext, { ActionsChapterFilterContext } from "@/utils/context/ChapterFilterContext";

type Props = {
  onChange: (file: ImageType[]) => void;
  name: string;
  required?: boolean;
  label?: string;
  errMsg?: string;
  isMulti?: boolean;
  clearForm?: boolean;
  setClearForm?: (clear: boolean) => void;
  previews?: string[] | ImageType[];
};

const DragAndDrop: FC<Props> = ({
  onChange,
  name,
  required = false,
  label,
  errMsg,
  isMulti = false,
  clearForm = false,
  previews = [],
  setClearForm
}) => {

  const [filesItem, setFilesItems] = useState<ImageType[]>([]);

  const { edited, editingChapter } = useContext(ViewChapterFilterContext);
  const { setEdited } = useContext(ActionsChapterFilterContext);

  const handlePreview = (files: File[] | File) => {
    if (!Array.isArray(files) && files instanceof Blob) files = [files];

    let selectedFilesArray = Array.from(files);
    let fileItemArr: ImageType[] = selectedFilesArray.map(
      (selected, i) => ({
        id: "img-" + (filesItem.length + (i + 1 )),
        name: (filesItem.length + i) + '.' +selected.name.split('.').pop()!,
        file: selected,
        url: URL.createObjectURL(selected),
        position: filesItem.length + i,
      })
    );

    if (isMulti) {
      fileItemArr = [...filesItem].concat(fileItemArr);
    }

    setFilesItems(fileItemArr);
  };

  const onRemoveImage = (position: number) => {
    const newImages = filesItem.filter((prev) => prev.position !== position ?? prev);

    let fileItemArr: ImageType[] = newImages.map((selected, i) => ({
      id: selected.id ? selected.id : "img-" + (i + 1),
      name: (i + 1) + '.' + selected.url.split('.').pop()!,
      file: selected.file,
      url: selected.file ? URL.createObjectURL(selected.file) : selected.url,
      position: i,
    }));

    setFilesItems(fileItemArr);
  };

  const handleDrop = (acceptedFiles: File[]) => {
    handlePreview(acceptedFiles);
  };


  useEffect(() => {
    if(previews.length > 0 && isType<ImageType[]>(previews) ) setFilesItems(previews as ImageType[])    
  }, [previews.length]);

  useEffect(() => {
    console.log('pasa')
    onChange(filesItem);
    
    return () =>
      filesItem.forEach((preview) => 
      preview?.url?.startsWith('blob') && URL.revokeObjectURL(preview.url));
  }, [filesItem]);

  useEffect(() => {
    if (clearForm) { 
      setFilesItems([])
      setClearForm!(false);
    };
  }, [clearForm]);

  useEffect(() => {
    if(edited) {
      setFilesItems(editingChapter?.images as ImageType[]);
      setEdited!(false);
    }
  }, [edited])

  return (
    <div className="mb-4">
      {label && <label htmlFor="">{label}</label>}

      <Dropzone onDrop={handleDrop} multiple={isMulti} accept={FILE_TYPES}>
        {({ getRootProps, getInputProps }) => (
          <div
            className="py-4 flex items-center justify-center gap-3 border-dashed border-2 border-important cursor-pointer mt-3"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {
              filesItem.length === 1 && !isMulti  
                ? (
                filesItem.map((prev, i) => (<img key={i} src={ typeof prev === 'string' ? prev : prev.url as string} />))
                )
                : ( <div className="flex items-center flex-col py-4 h-full w-full">
                <RiImageAddFill className="mb-3" size={50} />
                <span className="font-semibold text-sm xl:text-lg 2xl:text-2xl">
                  Arrasta una imagen aca!
                </span>
              </div>) 
            }                 
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
