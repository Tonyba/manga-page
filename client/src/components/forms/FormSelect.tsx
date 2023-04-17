import React, { FC } from 'react'
import { selectStyles } from '@/utils/helpers';
import makeAnimated from "react-select/animated";
import { default as ReactSelect } from "react-select";
import { OptionType } from '@/utils/types';

const animatedComponents = makeAnimated();

type Props = {
    options: any[];
    onChange: (val: any) => void;
    isMulti?: boolean;
    label: string;
    defaultValue: OptionType | OptionType[];
    placeholder: string;
}

const FormSelect:FC<Props> = ({options, onChange, isMulti = false, label, defaultValue, placeholder}) => {
  return (
    <>
        <label className='mb-2 block'  htmlFor="type">{label}</label>
        <ReactSelect
        id='type'
        closeMenuOnSelect={true}
        components={animatedComponents}
        options={options}
        placeholder={placeholder}
        isMulti={isMulti}
        defaultValue={defaultValue}
        styles={selectStyles}
        onChange={(value: any) => onChange(value) }
        />
    </>
     
  )
}

export default FormSelect