import React, { FC, useEffect, useState } from "react";
import Popup from "../shared/Popup";
import AddChapterForm from "../forms/AddChapterForm";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import {
  ChapterValidationType,
  ContentValidationType,
  CreateChapterParams,
} from "@/utils/types";
import { validateChapter } from "@/utils/validations/ChapterAddValidation";
import Swal from "sweetalert2";
import { addChapter } from "@/utils/axios/contentType";
import { useRouter } from "next/router";

type Props = {
  isOpen: boolean;
  onModalClose: () => void;
};

const initState: CreateChapterParams = {
  capNumber: 0,
  episode: "",
  images: [],
  mangaId: 0,
};

const DashboardAddChapterModal: FC<Props> = ({
  isOpen = false,
  onModalClose,
}) => {
  const [chapter, setChapter] = useState<CreateChapterParams>(initState);
  const [errors, setErrors] = useState<ChapterValidationType>();
  const [submitting, setSubmitting] = useState(false);
  const [clearForm, setClearForm] = useState(false);
  const router = useRouter();
  const { contentId } = router.query;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(validateChapter(chapter));
    router.reload();
  };

  useEffect(() => {
    if (errors && submitting) {
      if (Object.keys(errors).length !== 0) {
        Swal.fire("Hay errores en el formulario", "", "error");
      } else {
        saveContent();
      }
      setSubmitting(false);
    }
  }, [submitting, JSON.stringify(errors)]);

  const saveContent = () => {
    const numberedImages = chapter.images.map((img, i) => {
      const newImg = img.slice(0, img.size, img.type);
      const ext =
        img.name.substring(img.name.lastIndexOf(".") + 1, img.name.length) ||
        img.name;

      const newFile = new File([newImg], `${i + 1}.${ext}`, {
        type: newImg.type,
      });

      return newFile;
    });

    addChapter({
      ...chapter,
      episode: `capitulo ${chapter.capNumber}`,
      mangaId: parseInt(contentId as string),
      images: numberedImages,
    })
      .then((res) => {
        console.log(res);
        Swal.fire("Capitulo creado", "", "success");
        cleanForm();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error inesperado", "algo salio mal", "error");
      });
  };

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
      className="w-full bg-primary-dark rounded-md p-5 min-h-full absolute top-0 left-0"
    >
      <div className="flex justify-end">
        <button
          className="bg-primary p-3 rounded-full bg-hover"
          onClick={onModalClose}
        >
          <FaTimes size={20} />
        </button>
      </div>

      <div className="h-full">
        <h2 className="text-xl font-semibold mb-5">
          Agrega las imagenes del capitulo
        </h2>

        <AddChapterForm
          onSubmit={onSubmit}
          loading={submitting}
          errors={errors}
          data={chapter}
          setData={setChapter}
          clearForm={clearForm}
        />
      </div>
    </motion.div>
  );
};

export default DashboardAddChapterModal;
