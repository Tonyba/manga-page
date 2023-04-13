import React from "react";

import BeatLoader from "react-spinners/BeatLoader";

const ChapterSpinner = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <BeatLoader size={30} color="#0ea5e9" />
    </div>
  );
};

export default ChapterSpinner;
