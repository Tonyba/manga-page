import React, { FC } from "react";

import BeatLoader from "react-spinners/BeatLoader";

type Props = {
  size?: number;
  color?: string;
};

const LoadingSpinner: FC<Props> = ({ size = 30, color = "#0ea5e9" }) => {
  return <BeatLoader size={size} color={color} />;
};

export default LoadingSpinner;
