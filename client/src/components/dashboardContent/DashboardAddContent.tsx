import React from 'react'
import AddContentForm from '../forms/AddContentForm'

const DashboardAddContent = () => {
  return (
    <div>
       <h1 className="font-semibold text-3xl">Agregar Contenido</h1>
       <div className='flex py-5'>
          <div className='w-3/4'>
            <AddContentForm />
          </div>
          <div className='w-1/4'>
            gagwg
          </div>
       </div>
    </div>
  )
}

export default DashboardAddContent