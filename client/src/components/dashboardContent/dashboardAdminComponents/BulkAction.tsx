import React, { FC } from 'react'

type Props = {
    label: string;
    onClick: () => void;
    icon?: React.ReactElement
}

const BulkAction:FC<Props> = ({label, onClick, icon}) => {
  return (
    <div className='bg-red-500 py-3 px-2 cursor-pointer flex items-center gap-1' onClick={onClick} >
        {label}
        {icon && icon}
    </div>
  )
}

export default BulkAction