import { createContext } from 'react';
import { ChapterItemType, ContentResponseType, ContentType } from '../types';

type ChapterFilterContextType = {
    chapters: ChapterItemType[],
    loading?: boolean,
    content?: ContentType,
    editingChapter?: ChapterItemType
}

type Actions = {
    setChapters: (chapters: ChapterItemType[]) => void,
    setLoading?: (loading: boolean) => void,
    setContent?: (content: ContentResponseType) => void,
    setModalOpen?: (open: boolean) => void,
    setEditingChapter?: (chap: ChapterItemType) => void
}

const ViewChapterFilterContext = createContext<ChapterFilterContextType>({
    chapters: [],
    loading: true,
})

export const ActionsChapterFilterContext = createContext<Actions>({
    setChapters: () => {},
    setLoading: () => {},
    setContent: () => {},
    setModalOpen: () => {},
    setEditingChapter: () => {}
})


export default ViewChapterFilterContext;