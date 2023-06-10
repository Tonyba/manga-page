import React, {FC, PropsWithChildren, useContext} from 'react'
import LoadingSpinner from '../chapter/LoadingSpinner'
import { ContentListContext } from '@/utils/context/ContentListContext';

export const LoadingWrapper: FC<PropsWithChildren> = ({children}) => {
  
  const {loading} = useContext(ContentListContext);
  
  return (
    <div className='relative' >
       { loading && <div className='absolute flex w-full h-full bg-primary-dark-opacity justify-center items-center z-10'>
             <LoadingSpinner />
        </div>}
        {children}
    </div>
  )
}
