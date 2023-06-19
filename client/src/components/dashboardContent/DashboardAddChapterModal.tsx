import React, { FC, useContext, useEffect, useState } from "react";
import AddChapterForm from "../forms/AddChapterForm";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { ChapterValidationType, CreateChapterParams, ImageType } from "@/utils/types";
import { validateChapter } from "@/utils/validations/ChapterAddValidation";
import Swal from "sweetalert2";
import { addChapter } from "@/utils/axios/contentType";
import { useRouter } from "next/router";
import { revalidateManga } from "@/utils/axios/revalidate";
import ViewChapterFilterContext from "@/utils/context/ChapterFilterContext";
import { isType } from "@/utils/helpers";

type Props = {
  isOpen: boolean;
  onModalClose: () => void;
  updateCaps: () => void;
  chaptersTotal: number;
};

const initState: CreateChapterParams = {
  capNumber: 1,
  episode: "",
  images: [],
  mangaId: 0,
};

const DashboardAddChapterModal: FC<Props> = ({
  isOpen = false,
  onModalClose,
  updateCaps,
  chaptersTotal,
}) => {
  const { editingChapter } = useContext(ViewChapterFilterContext);
  const [chapter, setChapter] = useState<CreateChapterParams>({
    ...initState,
    capNumber: chaptersTotal + 1,
  });
  const [errors, setErrors] = useState<ChapterValidationType>();
  const [submitting, setSubmitting] = useState(false);
  const [clearForm, setClearForm] = useState(false);
  const router = useRouter();
  const { contentId } = router.query;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(validateChapter(chapter));
  };

  useEffect(() => {
    if(editingChapter) setChapter({
      ...editingChapter, 
        episode: `capitulo-${editingChapter.capNumber}`, 
        images: isType<ImageType[]>(editingChapter.images) ? editingChapter.images : [] 
    });
  }, [editingChapter]);

  useEffect(() => {
    if (errors && submitting) {
      if (Object.keys(errors).length !== 0) {
        Swal.fire("Hay errores en el formulario", "", "error");
      } else {
        editingChapter ? editChapter() : saveChapter();
      }
    }
  }, [submitting, JSON.stringify(errors)]);

  const saveChapter = () => {
    const numberedImages = chapter.images.flatMap((img , i) => {
      if(typeof img === 'string' ) return [];
      
      const image = img as ImageType;

      console.log(image)
      
      const newImg = image.file?.slice(0,image.file?.size,image.file?.type);

      const ext =
     image.file?.name.substring(image.file?.name.lastIndexOf(".")! + 1,image.file?.name.length) ||
     image.file?.name;

      const newFile = new File([newImg!], `${i + 1}.${ext}`, {
        type: newImg?.type,
      });

      return newFile;
    });

    addChapter({
      ...chapter,
      episode: `capitulo ${chapter.capNumber}`,
      mangaId: parseInt(contentId as string),
      images: numberedImages,
    })
      .then(async (res) => {
        console.log(res);
        await revalidateManga(contentId as string);
        Swal.fire("Capitulo creado", "", "success");
        setSubmitting(false);
        updateCaps();
        cleanForm();
      })
      .catch((err) => {
        console.log(err);
        setSubmitting(false);
        Swal.fire("Error inesperado", err.response.data.message, "error");
      });
  };

  const editChapter = () => {
    console.log(chapter);
    setSubmitting(false);
  }

  const cleanForm = () => {
    setChapter(initState);
    setClearForm(true);
  };

  return (
    <motion.div
      animate={{
        top: isOpen ? 0 : "100%",
        display: isOpen ? "block" : "none",
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? "visible" : "hidden",
      }}
      className="w-full bg-primary-dark rounded-md p-5 min-h-full absolute top-0 left-0 z-10"
    >
      <div className="flex justify-end">
        <button
          className="bg-primary p-3 rounded-full bg-hover"
          onClick={() => {
            onModalClose();
            setClearForm(true);
          }}
        >
          <FaTimes size={20} />
        </button>
      </div>

      <div className="h-full">
        <h2 className="text-xl font-semibold mb-5">
          {`${editingChapter ? 'Agrega o Edita' : 'Agrega'}`} las imagenes del capitulo
        </h2>

        <AddChapterForm
          onSubmit={onSubmit}
          loading={submitting}
          errors={errors}
          data={chapter}
          setData={setChapter}
          clearForm={clearForm}
          setClearForm={setClearForm}
          editing={editingChapter ? true : false}
        />
      </div>
    </motion.div>
  );
};

export default DashboardAddChapterModal;
