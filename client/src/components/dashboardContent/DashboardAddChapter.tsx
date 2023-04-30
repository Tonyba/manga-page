import { getManga } from "@/utils/axios/contentType";
import { ContentResponseType } from "@/utils/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DashboardTitle from "./DashboardTitle";
import DashboardAddChapterSide from "../sidebars/DashboardAddChapterSide";
import ContentChapters from "@/components/content/ContentChapters";
import { FaPlus } from "react-icons/fa";
import DashboardAddChapterModal from "./DashboardAddChapterModal";

const DashboardAddChapter = () => {
  const router = useRouter();
  const [content, setContent] = useState<ContentResponseType>();
  const { contentId } = router.query;
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    const resp = await getManga(contentId as string);
    const contentResp = resp.data;

    setContent(contentResp);
  };

  useEffect(() => {
    fetchData();
  }, [contentId]);

  return (
    <>
      <DashboardTitle text="Agregar Capitulos" />
      <div className="py-5 flex w-full">
        <div className="w-3/4	relative">
          <button
            className="bg-primary bg-hover py-2 px-3 rounded-lg flex gap-3 items-center mb-6"
            onClick={() => setModalOpen(true)}
          >
            <FaPlus size={18} />
            Agregar Capitulo
          </button>

          <div className="grid grid-cols-4 gap-y-4">
            {content?.manga.Episodes.map((episode, i) => (
              <ContentChapters key={i} {...episode} />
            ))}
          </div>

          <DashboardAddChapterModal
            isOpen={modalOpen}
            onModalClose={() => setModalOpen(false)}
          />
        </div>
        <aside className="w-1/4	 px-5 sticky top-5">
          {content && <DashboardAddChapterSide content={content} />}
        </aside>
      </div>
    </>
  );
};

export default DashboardAddChapter;
