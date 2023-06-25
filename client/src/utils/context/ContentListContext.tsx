import React, { RefObject, createContext } from 'react'
import { ContentType, FiltersType } from '../types'
import { INIT_FILTER_STATE } from '../constants'

type ContentListContextType = {
    content: ContentType[],
    setContent: (content: ContentType[]) => void,
    filters: FiltersType,
    setCount: (count: number) => void,
    loading: boolean,
    setLoading: (loading: boolean) => void,
    checkedAll?: RefObject<HTMLInputElement>
}

export const ContentListContext = createContext<ContentListContextType>({
    content: [],
    setContent: () => {},
    filters: INIT_FILTER_STATE,
    setCount: () => {},
    loading: false,
    setLoading: () => {},
    checkedAll: undefined
})