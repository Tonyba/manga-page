import ViewChapterFilterContext from '@/utils/context/ChapterFilterContext'
import { ChapterItemType } from '@/utils/types';
import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import ContentChapters from '../content/ContentChapters';
import Pagination from '../pagination/Pagination';


type Props = {
    totalEpisodes: number;
    showActions?: boolean
}

const itemsPerPage = 12;

const ChapterList:FC<Props> = ({ totalEpisodes, showActions = false }) => {

  const { chapters } = useContext(ViewChapterFilterContext);
  const [currentPage, setCurrentPage] = useState(0);

  const paginateChapters = (chapters: ChapterItemType[]) => {
    const paginated = [...chapters].reduce(
      (acc: ChapterItemType[][], val, i) => {
        let idx = Math.floor(i / itemsPerPage);
        let page: ChapterItemType[] = acc[idx] || (acc[idx] = []);
        page.push(val);

        return acc;
      },
      []
    );


    return paginated || [];

  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = totalEpisodes && Math.ceil(totalEpisodes / itemsPerPage);

  const [ paginatedCaps, setPaginatedCaps ] = useState<ChapterItemType[][]>(paginateChapters(chapters)); 

  const isMounted = useRef(false);

  useEffect(() => {
    if(!isMounted.current) {
      isMounted.current = true
   } else {
      setPaginatedCaps(paginateChapters(chapters));
   } 
   
  }, [chapters]);


  return <>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
    {paginatedCaps[currentPage] && paginatedCaps[currentPage].map((ch, index) =><ContentChapters showActions={showActions} key={index} {...ch} />) }
    
    </div>
     <div className="mt-10">
      <Pagination
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        totalItems={totalEpisodes || 0}
        pageCount={totalPages ? totalPages : 0}
        initialPage={currentPage}
      />
    </div>
  
  </> ;
    
  
}

export default ChapterList