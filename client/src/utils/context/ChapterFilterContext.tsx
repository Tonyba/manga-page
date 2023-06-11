import { createContext } from 'react';
import { ChapterItemType, ContentResponseType, ContentType } from '../types';

type ChapterFilterContextType = {
    chapters: ChapterItemType[],
    loading?: boolean,
    content?: ContentType
}

type Actions = {
    setChapters: (chapters: ChapterItemType[]) => void,
    setLoading?: (loading: boolean) => void,
    setContent?: (content: ContentResponseType) => void
}

const ViewChapterFilterContext = createContext<ChapterFilterContextType>({
    chapters: [],
    loading: true
})

export const ActionsChapterFilterContext = createContext<Actions>({
    setChapters: () => {},
    setLoading: () => {},
    setContent: () => {}
})


export default ViewChapterFilterContext;