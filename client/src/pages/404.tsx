import React from 'react'

const PageNotFound = () => {
  return (
    <div className='mx-auto xl:px-30 max-w-7xl flex justify-center items-center flex-col pb-5 xl:pb-28 xl:py-28'>
        <img src='/not-found-error.svg' alt='not found' width={400} height={320} />
        <h1 className='text-3xl font-semibold text-center'  >
            La Pagina que buscas no existe
        </h1>
        
    </div>
  )
}

export default PageNotFound