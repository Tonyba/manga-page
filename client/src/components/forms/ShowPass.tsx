import React, { FC } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible }  from 'react-icons/ai'

type Props = {
    showPass: boolean;
    setShow: (show: boolean) => void
}

const ShowPass:FC<Props> = ({showPass, setShow}) => {
  return (

    <span onClick={() => setShow(!showPass)} className='bg-primary-dark bg-primary-dark-hover p-2 absolute top-2 right-4 rounded-full cursor-pointer' >{
        showPass ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />
    }</span>
    
  )
}

export default ShowPass