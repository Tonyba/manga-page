import React, { FC } from 'react'


type Props =  {
    onChange: (val: string) => void;
    label: string;
    defaulValue?: string;
    value?: string;
    placeholder?: string;
    name?: string;
}

const TextArea:FC<Props> = ({label, value, placeholder, name, defaulValue, onChange}) => {
  return (
    <div>
     <label htmlFor={name}>{label}</label>
     <textarea placeholder={placeholder} value={value} rows={5} className='bg-primary w-full rounded-md text-sm outline-none p-3' onChange={(e) => onChange(e.target.value)}></textarea>

    </div>
  )
}

export default TextArea