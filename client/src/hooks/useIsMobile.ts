import React, { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setIsMobile(true);
    }
  }, []);

  return [isMobile];
};
