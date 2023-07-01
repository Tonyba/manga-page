import { createContext } from 'react';
import { ChapterItemType, ContentResponseType, ContentType } from '../types';

type ChapterFilterContextType = {
    chapters: ChapterItemType[],
    loading?: boolean,
    content?: ContentType,
    editingChapter?: ChapterItemType,
    viewActions?: boolean,
    edited?: boolean
}

type Actions = {
    setChapters: (chapters: ChapterItemType[]) => void,
    setLoading?: (loading: boolean) => void,
    setContent?: (content: ContentResponseType) => void,
    setModalOpen?: (open: boolean) => void,
    setEditingChapter?: (chap: ChapterItemType) => void,
    setEdited?: (edited: boolean) => void
}

const ViewChapterFilterContext = createContext<ChapterFilterContextType>({
    chapters: [],
    loading: true,
    viewActions: false,
    edited: false
})

export const ActionsChapterFilterContext = createContext<Actions>({
    setChapters: () => {},
    setLoading: () => {},
    setContent: () => {},
    setModalOpen: () => {},
    setEditingChapter: () => {},
    setEdited: () =>{}
})


export default ViewChapterFilterContext;