import { OptionType } from "@/utils/types";
import React, { FC, useEffect, useState } from "react";

type Props = {
  options: OptionType[];
  defaultValue?: OptionType;
  onChange: (value: string) => void;
};

const Select: FC<Props> = ({ options, defaultValue, onChange }) => {
  const [defaultVal, setDefault] = useState<string | undefined>(
    defaultValue?.value
  );

  useEffect(() => {
    setDefault(defaultValue?.value);
  }, [defaultValue]);

  return (
    <select
      value={defaultVal ? defaultVal : options[0].value}
      className="w-full sm:w-20  rounded-lg bg-primary p-1 outline-none"
      onChange={(val) => onChange(val.target.value)}
    >
      {options.map((opt, index) => (
        <option value={opt.value} key={index}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
