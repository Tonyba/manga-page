import React, { FC, useEffect, useRef, useState } from "react";
import makeAnimated from "react-select/animated";
import { default as ReactSelect } from "react-select";
import { OptionType } from "@/utils/types";
import ValidationError from "./ValidationError";
import { SELECT_STYLES } from "@/utils/constants";
import { useSearchParams } from "next/navigation";

const animatedComponents = makeAnimated();

type Props = {
  options: any[];
  onChange: (val: any) => void;
  isMulti?: boolean;
  label: string;
  defaultValue: OptionType | OptionType[];
  placeholder: string;
  errMsg?: string | string[];
};

const FormSelect: FC<Props> = ({
  options,
  onChange,
  isMulti = false,
  label,
  errMsg,
  defaultValue,
  placeholder,
}) => {

  return (
    <>
      <label className="mb-2 block" htmlFor="type">
        {label}
      </label>
      <ReactSelect
        id="type"
        closeMenuOnSelect={true}
        components={animatedComponents}
        options={options}
        placeholder={placeholder}
        isMulti={isMulti}
        value={defaultValue}
        styles={SELECT_STYLES}
        onChange={(value: any) => onChange(value)}
      />
      {errMsg && <ValidationError errorMessage={errMsg as string} />}
    </>
  );
};

export default FormSelect;
