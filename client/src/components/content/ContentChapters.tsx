import { ChapterItemType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useContext } from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import DashboardHoverItem from "../dashboardContent/DashboardHoverItem";
import { useAppContext } from "@/utils/context/AppContext";
import ViewChapterFilterContext, { ActionsChapterFilterContext } from "@/utils/context/ChapterFilterContext";
import { deleteChapter, getChapter, getManga } from "@/utils/axios/contentType";
import { revalidateManga } from "@/utils/axios/revalidate";


type Props = {
  showActions?: boolean
}

const ContentChapters: FC<ChapterItemType & Props> = ({
  title,
  mangaId,
  capNumber,
  image,
  id,
  showActions = false
}) => {

  const { user } = useAppContext();
  const { setLoading, setContent, setModalOpen, setEditingChapter, setChapters } = useContext(ActionsChapterFilterContext);
  const {viewActions} = useContext(ViewChapterFilterContext);

  const onDelete = async () => {
    setLoading!(true);
    await deleteChapter(id);
    const resp = await getManga(mangaId);
    setContent!(resp.data);
    setChapters(resp.data.manga.episodes);
    setLoading!(false);
    await revalidateManga(mangaId.toString());
  }

  const onUpdate = async () => {
      setLoading!(true);
      
      const resp = await getChapter(id);
      const data = resp.data;
      setEditingChapter!(data);

      setLoading!(false);

      setModalOpen!(true);
  }

  return (
    <div className="flex items-center gap-3">
      <div className="w-24">
        <Link href={`/content/${mangaId}/capitulo-${capNumber}`}>
          
          <Image
            alt={title}
            className="object-cover rounded-lg h-20"
            src={`${ image ? image : 'https://picsum.photos/200/150'}`}
            width={200}
            height={150}
          />
        </Link>
      </div>
      <div>
          <Link
            href={`/content/${mangaId}/capitulo-${capNumber}`}
            className="capitalize cursor-pointer"
          >
            {title}
          </Link>
        { (user?.role === 'Admin' && viewActions ) &&  <div className="gap-3 flex mt-3"> 
            <DashboardHoverItem onClick={onUpdate} textHover="Editar">
              <FaPencilAlt size={18} />
            </DashboardHoverItem>
            <DashboardHoverItem onClick={onDelete} textHover="Borrar">
                  <FaTrash size={18} />
            </DashboardHoverItem>
          </div>}
          
      </div>
      
    </div>
  );
};

export default ContentChapters;
