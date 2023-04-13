import React, { useEffect, useState } from "react";

export const useDevideWidth = (itemSpace: number) => {
  const [Dwidth, setDwidth] = useState("250px");
  const [space, setSpace] = useState<number>(itemSpace);
  const [device, setDevice] = useState<number>();

  useEffect(() => {
    const width = window.innerWidth;
    setDevice(width);

    if (width < 768) {
      setDwidth("100%");
      setSpace(0);
    }
  }, []);

  return [Dwidth, space, device];
};
