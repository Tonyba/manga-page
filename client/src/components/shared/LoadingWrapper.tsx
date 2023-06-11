import React, {FC, PropsWithChildren, useContext} from 'react'
import LoadingSpinner from '../chapter/LoadingSpinner'

type Props = {
  loading: boolean
}

export const LoadingWrapper: FC<PropsWithChildren & Props> = ({children, loading}) => {
  
  return (
    <div className='relative' >
       { loading && <div className='absolute flex w-full h-full bg-primary-dark-opacity justify-center items-center z-10'>
             <LoadingSpinner />
        </div>}
        {children}
    </div>
  )
}
