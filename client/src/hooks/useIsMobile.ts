import React, { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState({
    mobile: false,
    tablet: false,
  });

  useEffect(() => {
    const width = window.innerWidth;

    if (width < 1024) {
      setIsMobile({ ...isMobile, tablet: true });
    }

    if (width < 768) {
      setIsMobile({
        tablet: false,
        mobile: true,
      });
    }
  }, []);

  return [isMobile.mobile, isMobile.tablet];
};
