import React, { FC, useState } from "react";
import Input from "./Input";

type Props = {
  onSubmit: () => void;
};

const AddContentForm: FC<Props> = ({ onSubmit }) => {
  const [data, setData] = useState();

  return (
    <form onSubmit={() => onSubmit()}>
      <Input />
    </form>
  );
};

export default AddContentForm;
