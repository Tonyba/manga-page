import React, { FC } from "react";

type Props = {
  errorMessage: string;
};

const ValidationError: FC<Props> = ({ errorMessage }) => {
  return (
    <span className="text-red-500 font-medium text-sm">{errorMessage}</span>
  );
};

export default ValidationError;
