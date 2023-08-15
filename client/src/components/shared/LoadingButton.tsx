import React from "react";
import LoadingSpinner from "../chapter/LoadingSpinner";

const LoadingButton = () => {
  return (
    <button className="button-primary p-4 px-7 rounded-md font-medium my-5 text-xl">
      <LoadingSpinner size={10} color="white" />
    </button>
  );
};

export default LoadingButton;
