import { createContext } from 'react';
import { ChapterItemType } from '../types';

type ChapterFilterContextType = {
    chapters: ChapterItemType[]
}

type Actions = {
    setChapters: (chapters: ChapterItemType[]) => void
}

const ViewChapterFilterContext = createContext<ChapterFilterContextType>({
    chapters: []
})

export const ActionsChapterFilterContext = createContext<Actions>({
    setChapters: () => {}
})


export default ViewChapterFilterContext;