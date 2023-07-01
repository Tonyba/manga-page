import { getChapter, getManga } from "@/utils/axios/contentType";
import { ChapterItemType, ContentResponseType } from "@/utils/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DashboardTitle from "./DashboardTitle";
import DashboardAddChapterSide from "../sidebars/DashboardAddChapterSide";
import { FaPlus, FaRegSadCry} from "react-icons/fa";
import DashboardAddChapterModal from "./DashboardAddChapterModal";
import ViewChapterFilterContext, { ActionsChapterFilterContext } from "@/utils/context/ChapterFilterContext";
import Filter from "../filter/Filter";
import ChapterList from "../mangaComponents/ChapterList";
import { LoadingWrapper } from "../shared/LoadingWrapper";

const DashboardAddChapter = () => {
  const router = useRouter();
  const { contentId } = router.query;

  const [content, setContent] = useState<ContentResponseType>();
  const [modalOpen, setModalOpen] = useState(false);
  const [filteredCaps, setFilteredCaps] = useState<ChapterItemType[]>(
    content?.manga.episodes || []
  );
  const [loading, setLoading] = useState(false);

  const [editingChapter, setEditingChapter] = useState<ChapterItemType>();
  
  const [edited, setEdited] = useState(false);

  const fetchData = async (chapterId?: number) => {
    if (!contentId) return;
    const resp = await getManga(parseInt(contentId as string));
    const contentResp = resp.data;
    const resultEps = resp.data.manga.episodes.map( (ep) => ({...ep, checked: false}));

    setContent(contentResp);
    setFilteredCaps(resultEps);

    if(chapterId) {
      const capRes = await getChapter(chapterId);
      return capRes.data.images; 
    }

  };

  useEffect(() => {
    fetchData();
  }, [contentId]);

  return (
    <>
      <DashboardTitle text="Agregar Capitulos" />
      <div className="py-5 flex w-full flex-wrap-reverse xl:flex-wrap ">
        <div className="w-full lg:w-3/4	relative">
          <button
            className="bg-primary bg-hover py-2 px-3 rounded-lg flex gap-3 items-center mb-6"
            onClick={() => setModalOpen(true)}
          >
            <FaPlus size={18} />
            Agregar Capitulo
          </button>

          
          <ViewChapterFilterContext.Provider value={{ chapters: filteredCaps, loading, editingChapter, viewActions:true, edited}}>
              <ActionsChapterFilterContext.Provider value={{ 
                setChapters: setFilteredCaps, 
                setContent, 
                setLoading, 
                setModalOpen, 
                setEditingChapter,
                setEdited
                }} >
                <LoadingWrapper loading={loading} >
                   <div className="mb-3 border-b border-primary  pb-3">
                      <Filter type="chapters" />
                    </div>

                    {content?.manga.numEpisodes === 0 && (
                    <h2 className="text-2xl font-medium">Capitulos</h2> 
                  )}

                  {content?.manga.numEpisodes === 0 ? (
                    <div className="flex flex-col items-center gap-5">
                      <FaRegSadCry className="text-dark" size={120} />
                      <p className="font-semibold text-xl">No hay Capitulos</p>
                    </div>
                  ) : <ChapterList showActions={true}  totalEpisodes={content?.manga.numEpisodes || 0} />}



                  {content?.manga.numEpisodes != null && content?.manga.numEpisodes != undefined && (
                          <>
                          <DashboardAddChapterModal
                            isOpen={modalOpen}
                            chaptersTotal={content?.manga.numEpisodes}
                            onModalClose={() => {
                              setModalOpen(false);
                              setEditingChapter(undefined);
                            }}
                            updateCaps={fetchData}
                          />
                          </>
                    )}

        
                </LoadingWrapper>
    
            </ActionsChapterFilterContext.Provider>
           
       
          </ViewChapterFilterContext.Provider>
         

        
        </div>
        <aside className="w-full lg:w-1/4 xl:pl-5 xl:sticky top-5 mb-5">
          {content && <DashboardAddChapterSide content={content} />}
        </aside>
      </div>
    </>
  );
};

export default DashboardAddChapter;
